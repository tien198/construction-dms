import type { IDocumentWriteRepository } from '../port/outbound/database/document-write.repository.port';
import type { IDocumentQueryRepository } from '../port/outbound/database/document-query.repository.port';
import type { IConstructionWriteRepository } from '../port/outbound/database/construction-write.repository.port';
import type { IConstructionQueryRepository } from '../port/outbound/database/construction-query.repository.port';
import type { IUnitOfWork } from '../port/outbound/database/i-unit-of-work.port';

import { Inject, Injectable } from '@nestjs/common';

import { Construction } from 'src/construction/domain/construction/construction.entity';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { IDocumentSubmissionUseCase } from '../port/inbound/document-submission.use-case';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { DecisionAssembler } from '../assembler/document/decision.assembler';
import { ConstructionAssembler } from '../assembler/construction/construction.assembler';
import { PoolClient } from 'pg';

@Injectable()
export class DocumentSubmissionService implements IDocumentSubmissionUseCase {
  constructor(
    @Inject('IDocumentWriteRepository')
    private readonly _docWriteRepo: IDocumentWriteRepository,
    @Inject('IConstructionQueryRepository')
    private readonly _conQueryRepo: IConstructionQueryRepository,
    @Inject('IConstructionWriteRepository')
    private readonly _conWriteRepo: IConstructionWriteRepository,
    @Inject('IDocumentQueryRepository')
    private readonly _docQueryRepo: IDocumentQueryRepository,
    @Inject('IUnitOfWork')
    private readonly _uow: IUnitOfWork,
  ) {}

  async initConstruction(
    cmd: CreateSubmissionCommand,
  ): Promise<Construction | void> {
    const construction = ConstructionAssembler.fromCmd(cmd);

    const decision = DecisionAssembler.fromCmd(cmd);
    decision.construction_id = construction.id;

    const subDomain = decision.submissions[0];
    if (!subDomain) {
      throw new Error('Submission is required');
    }
    if (!subDomain.construction_info) {
      throw new Error('Construction info is required');
    }
    if (!subDomain.bid_packages || !Array.isArray(subDomain.bid_packages)) {
      throw new Error('Bid packages is required');
    }

    const client = (await this._uow.begin()) as PoolClient;
    try {
      await this._conWriteRepo.saveConstruction(construction, client);
      await this._docWriteRepo.saveNewDecision(
        construction.id.value!,
        decision,
        client,
      );
      await this._uow.commit(client);
      return construction;
    } catch (error) {
      await this._uow.rollback(client);
      throw error;
    }
  }

  async addKqLcnt(
    conId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Construction | void> {
    throw new Error('The method not implemented yet!');
    // const existCon = await this._conQueryRepo.findConstructionById(conId);
    // if (!existCon) {
    //   throw new Error(`Construction: "${conId}" not found`);
    // }
    // const decision = DecisionAssembler.fromCmd(cmd);
    // await this._docWriteRepo.saveNewDecision(existCon.id, decision);
  }

  async addSubmissionForNewDecision(
    conId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    const existCon = await this._conQueryRepo.findConstructionById(conId);
    if (!existCon) {
      throw new Error(`Construction: "${conId}" not found`);
    }

    // Build a new Decision aggregate for the existing construction
    const decision = DecisionAssembler.fromCmd(cmd);

    await this._docWriteRepo.saveNewDecision(existCon.id, decision);
    return decision;
  }

  async addSubmissionForExistedDecision(
    decId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    // Load the existing Decision aggregate
    const existDec = await this._docQueryRepo.findDecisionById(decId);
    if (!existDec) {
      throw new Error(`Decision: "${decId}" not found`);
    }
    const decDomain = DecisionAssembler.fromCmd(cmd);
    await this._docWriteRepo.saveExistingDecision(existDec.id, decDomain);
    return decDomain;
  }
}
