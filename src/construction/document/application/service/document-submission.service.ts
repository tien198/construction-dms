import type { IDocumentRepository } from '../port/outbound/database/document.repository.port';
import type { IUnitOfWork } from '../port/outbound/database/i-unit-of-work.port';

import { Inject, Injectable } from '@nestjs/common';
import { Decision } from '../../domain/decision.entity';
import { IDocumentSubmissionUseCase } from '../port/inbound/document-submission.use-case';
import { CreateSubmissionCommand } from '../commands/create-submission/create-submission.command';
import { DecisionAssembler } from '../assembler/decision.assembler';
import { ConstructionId } from '../../domain/value-objects/construction.vo';

@Injectable()
export class DocumentSubmissionService implements IDocumentSubmissionUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly repo: IDocumentRepository,
    @Inject('IUnitOfWork')
    private readonly uow: IUnitOfWork,
  ) {}

  async initConstruction(
    cmd: CreateSubmissionCommand,
  ): Promise<ConstructionId | void> {
    // Build the entire Decision aggregate
    const decision = DecisionAssembler.fromInitConstructionCmd(cmd);

    // Save the aggregate (repository handles persisting all child entities)
    const client = await this.uow.begin();
    try {
      await this.repo.saveDecision(decision, client);
      await this.uow.commit(client);
      return decision.construction.id;
    } catch (error) {
      await this.uow.rollback(client);
      throw error;
    }
  }

  async addSubmissionForNewDecision(
    conId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    // Find existing Decision for this construction to get the Construction entity
    const existingDecision = await this.repo.findDecisionByConstructionId(conId);
    if (!existingDecision) {
      throw new Error('Construction not found');
    }

    // Build a new Decision aggregate for the existing construction
    const decision = DecisionAssembler.fromNewDecisionCmd(
      cmd,
      existingDecision.construction,
    );

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

  async addSubmissionForExistedDecision(
    decId: string,
    cmd: CreateSubmissionCommand,
  ): Promise<Decision | void> {
    // Load the existing Decision aggregate
    const decision = await this.repo.findDecisionById(decId);
    if (!decision) {
      throw new Error('Decision not found');
    }

    // Build and add a new Submission to the aggregate
    const { submission, conInfor } =
      DecisionAssembler.buildSubmissionForExistingDecision(
        cmd,
        decision.construction,
      );

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
