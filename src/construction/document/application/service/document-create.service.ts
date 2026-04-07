import { Inject, Injectable } from '@nestjs/common';
import { Decision } from '../../domain/entity/decision.entity';
import { IDocumentCreateUseCase } from '../port/inbound/document.use-case';
import type { IDocumentRepository } from '../port/outbound/document.repository.port';
import { CreateSubmissionCommand } from '../command/create-submission.command';
import { ConstructionAssembler } from '../assembler/construction.assembler';
import { SubmissionAssembler } from '../assembler/submission.assembler';
import { DecisionAssembler } from '../assembler/decision.assembler';
import { ConstructionInfoSnapshotAssembler } from '../assembler/construction-info-snapshot.assembler';
import { BidPackageSnapshotAssembler } from '../assembler/bid-package-snapshot.assembler';
import type { IUnitOfWork } from '../port/outbound/i-unit-of-work.port';
import { PoolClient } from 'pg';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { ConstructionInforId } from '../../domain/value-objects/construction-infor.vo';
import { AdministrativeDocument } from '../../domain/entity/administrative-document.entity';
import { ConstructionInfoSnapshot } from '../../domain/entity/construction-infor.entity';

@Injectable()
export class DocumentCreateService implements IDocumentCreateUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly repo: IDocumentRepository,
    @Inject('IUnitOfWork')
    private readonly uow: IUnitOfWork,
  ) {}

  async initConstruction(
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    const con = ConstructionAssembler.fromCmd(cmd);
    if (!cmd.construction_infor_snapshot) {
      throw new Error(
        'Construction information snapshot is required to init brand new construction',
      );
    }
    const conInfor = ConstructionInfoSnapshotAssembler.fromCmd(
      cmd.construction_infor_snapshot,
      con.id,
    );

    const bidPackages = cmd.construction_infor_snapshot?.bid_package_snapshots
      ? BidPackageSnapshotAssembler.fromCmdList(
          cmd.construction_infor_snapshot.bid_package_snapshots,
          conInfor.id,
        )
      : [];

    const dec = DecisionAssembler.fromCmd(cmd, con.id);
    const sub = SubmissionAssembler.fromCmd(cmd, con.id, dec.id, conInfor?.id);

    // Begin transaction
    const client = (await this.uow.begin()) as PoolClient;

    try {
      // Save all entities
      con.current_snapshot_id = conInfor?.id ?? null;
      const construction = await this.repo.saveConstruction(con, client);

      await this.repo.saveConstructionInfoSnapshot(conInfor, client);

      for (const bidPackage of bidPackages) {
        await this.repo.saveBidPackageSnapshot(bidPackage, client);
      }
      // save Decision and its Administrative Document
      await this.repo.saveAdministrativeDocument(
        dec.document as AdministrativeDocument,
        client,
      );
      await this.repo.saveDecision(dec, client);

      // save Submission and its Administrative Document
      await this.repo.saveAdministrativeDocument(
        sub.document as AdministrativeDocument,
        client,
      );
      await this.repo.saveSubmission(sub, client);

      await this.uow.commit(client);

      return dec;
    } catch (error) {
      await this.uow.rollback(client);
      throw error;
    }
  }

  async addSubmissionForNewDecision(
    conId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    const con = await this.repo.findConstructionById(conId);
    if (!con) {
      throw new Error('Construction not found');
    }

    const conIdObj = new ConstructionId(conId);
    const conInfor = cmd.construction_infor_snapshot
      ? ConstructionInfoSnapshotAssembler.fromCmd(
          cmd.construction_infor_snapshot,
          conIdObj,
        )
      : null;

    const dec = DecisionAssembler.fromCmd(cmd, conIdObj);
    const sub = SubmissionAssembler.fromCmd(
      cmd,
      conIdObj,
      dec.id,
      conInfor?.id ?? con.current_snapshot_id,
    );

    // Begin transaction
    const client = (await this.uow.begin()) as PoolClient;

    try {
      // Save all entities
      if (conInfor) {
        await this.saveConInforAndRelevants(conId, conInfor, cmd, client);
      }
      // save Decision and its Administrative Document
      await this.repo.saveAdministrativeDocument(
        dec.document as AdministrativeDocument,
        client,
      );
      await this.repo.saveDecision(dec, client);

      // save Submission and its Administrative Document
      await this.repo.saveAdministrativeDocument(
        sub.document as AdministrativeDocument,
        client,
      );
      await this.repo.saveSubmission(sub, client);

      await this.uow.commit(client);
      return dec;
    } catch (error) {
      await this.uow.rollback(client);
      throw error;
    }
  }

  async addSubmissionForExistedDecision(
    decId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    const dec = await this.repo.findDecisionById(decId);
    if (!dec) {
      throw new Error('Decision not found');
    }
    const conIdObj = new ConstructionId(dec.construction_id.value);
    const conInfor = cmd.construction_infor_snapshot
      ? ConstructionInfoSnapshotAssembler.fromCmd(
          cmd.construction_infor_snapshot,
          conIdObj,
        )
      : null;

    let current_snapshot_id: ConstructionInforId | null = conInfor?.id ?? null;
    if (!conInfor) {
      const con = await this.repo.findConstructionById(
        dec.construction_id.value,
      );
      current_snapshot_id = con.current_snapshot_id;
    }

    const sub = SubmissionAssembler.fromCmd(
      cmd,
      conIdObj,
      dec.id,
      conInfor?.id ?? current_snapshot_id,
    );

    // Begin transaction
    const client = (await this.uow.begin()) as PoolClient;
    try {
      // Save all entities
      if (conInfor) {
        await this.saveConInforAndRelevants(
          dec.construction_id.value,
          conInfor,
          cmd,
          client,
        );
      }
      // save Submission and its Administrative Document
      await this.repo.saveAdministrativeDocument(
        sub.document as AdministrativeDocument,
        client,
      );
      await this.repo.saveSubmission(sub, client);

      await this.uow.commit(client);
      return dec;
    } catch (error) {
      await this.uow.rollback(client);
      throw error;
    }
  }

  private async saveConInforAndRelevants(
    conId: string,
    conInfor: ConstructionInfoSnapshot,
    cmd: CreateSubmissionCommand,
    client: PoolClient,
  ) {
    await this.repo.saveConstructionInfoSnapshot(conInfor, client);
    await this.repo.updateConstruction(
      conId,
      {
        current_snapshot_id: conInfor.id,
      },
      client,
    );
    const bidPackages = cmd.construction_infor_snapshot?.bid_package_snapshots
      ? BidPackageSnapshotAssembler.fromCmdList(
          cmd.construction_infor_snapshot.bid_package_snapshots,
          conInfor.id,
        )
      : [];

    for (const bidPackage of bidPackages) {
      await this.repo.saveBidPackageSnapshot(bidPackage, client);
    }
  }
}
