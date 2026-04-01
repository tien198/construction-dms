import { Inject, Injectable } from '@nestjs/common';
import { Decision } from '../../domain/entity/decision.entity';
import { IDocumentUseCase } from '../port/inbound/document.use-case';
import type { IDocumentRepository } from '../port/outbound/document.repository.port';
import { CreateSubmissionCommand } from '../command/create-submission.command';
import { ConstructionAssembler } from '../assembler/construction.assembler';
import { SubmissionAssembler } from '../assembler/submission.assembler';
import { DecisionAssembler } from '../assembler/decision.assembler';
import { ConstructionInfoSnapshotAssembler } from '../assembler/construction-info-snapshot.assembler';
import { BidPackageSnapshotAssembler } from '../assembler/bid-package-snapshot.assembler';

@Injectable()
export class DocumentService implements IDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly repo: IDocumentRepository,
  ) {}

  async initConstruction(cmd: CreateSubmissionCommand): Promise<Decision> {
    await Promise.resolve();
    const con = ConstructionAssembler.fromCmd(cmd);
    const conInfor = cmd.construction_infor_snapshot
      ? ConstructionInfoSnapshotAssembler.fromCmd(
          cmd.construction_infor_snapshot,
          con.id,
        )
      : null;

    const bidPackages =
      cmd.construction_infor_snapshot?.bid_package_snapshots && conInfor
        ? BidPackageSnapshotAssembler.fromCmdList(
            cmd.construction_infor_snapshot.bid_package_snapshots,
            conInfor.id,
          )
        : [];

    const dec = DecisionAssembler.fromCmd(cmd, con.id);
    const sub = SubmissionAssembler.fromCmd(cmd, con.id, dec.id, conInfor?.id);

    console.log('__________________ Init');
    console.log(con);

    /*
    await this.repo.saveConstruction(con);
    if (conInfor) await this.repo.saveConstructionInfoSnapshot(conInfor);

    for (const bidPackage of bidPackages) {
      await this.repo.saveBidPackageSnapshot(bidPackage);
    }
    await this.repo.saveDecision(dec);
    await this.repo.saveSubmission(sub);
    */

    /*
    ________ Create all in a TRANSACTION (IUnitOfWork) ________
    - construction
    - submission
    - bid package snapshot
    - construction info snapshot
    */
    return {} as Decision;
  }
  /*
  async createDecision(data: CreateSubmissionCommand): Promise<Decision> {
    const decision = new Decision(
      data.id || '',
      data.construction_id,
      data.period,
      data.is_change_construction_infor,
    );
    return this.repository.saveDecision(decision);
  }
  async updateDecision(
    id: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision> {
    const existing = await this.repository.findDecisionById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return this.repository.updateDecision(id, data);
  }

  async deleteDecision(id: string): Promise<void> {
    const existing = await this.repository.findDecisionById(id);
    if (!existing) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    await this.repository.deleteDecision(id);
  }

  async getDecisionById(id: string): Promise<Decision> {
    const decision = await this.repository.findDecisionById(id);
    if (!decision) {
      throw new NotFoundException(`Decision with ID ${id} not found`);
    }
    return decision;
  }

  async getAllDecisions(): Promise<Decision[]> {
    return this.repository.findAllDecisions();
  }
    */
}
