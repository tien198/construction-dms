import type { IDocumentWriteRepository } from '../port/outbound/database/document-write.repository.port';
import type { IDocumentQueryRepository } from '../port/outbound/database/document-query.repository.port';

import { Inject, Injectable } from '@nestjs/common';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { IDocumentSubmissionUseCase } from '../port/inbound/document-submission.use-case';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { DecisionAssembler } from '../assembler/decision.assembler';
import { ConstructionId } from 'src/construction/domain/document/value-objects/construction.vo';

@Injectable()
export class DocumentSubmissionService implements IDocumentSubmissionUseCase {
  constructor(
    @Inject('IDocumentWriteRepository')
    private readonly writeRepo: IDocumentWriteRepository,
    @Inject('IDocumentQueryRepository')
    private readonly queryRepo: IDocumentQueryRepository,
  ) {}

  async initConstruction(
    cmd: CreateSubmissionCommand,
  ): Promise<ConstructionId | void> {
    // Build the entire Decision aggregate
    const decision = DecisionAssembler.fromCmd(cmd);

    // Save the aggregate (repository handles persisting all child entities)
    await this.writeRepo.initConstruction(decision);
  }

  async addSubmissionForNewDecision(
    conId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    // Find existing Decision for this construction to get the Construction entity
    const existingCon = await this.queryRepo.findConstructionById(conId);
    if (!existingCon) {
      throw new Error('Construction not found');
    }

    // Build a new Decision aggregate for the existing construction
    const decision = DecisionAssembler.fromCmd(cmd);

    await this.writeRepo.saveNewDecision(decision);
    return decision;
  }

  async addSubmissionForExistedDecision(
    decId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    // Load the existing Decision aggregate
    const decision = await this.queryRepo.findDecisionById(decId);
    if (!decision) {
      throw new Error('Decision not found');
    }

    // Build and add a new Submission to the aggregate
    const { submission, conInfor } = DecisionAssembler.fromCmd(cmd);

    decision.addSubmission(submission);

    const client = await this.uow.begin();
    try {
      await this.repo.saveDecision(decision, client);
      await this.uow.commit(client);
      return decision;
    } catch (error) {
      await this.uow.rollback(client);
      throw error;
    }
  }
}
