import { ConstructionId } from 'src/construction/domain/value-objects/construction.vo';
import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
import { Decision } from 'src/construction/domain/document/decision.entity';

export interface IDocumentSubmissionUseCase {
  initConstruction(
    data: CreateSubmissionCommand,
  ): Promise<ConstructionId | void>;

  addSubmissionForNewDecision(
    conId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;

  addSubmissionForExistedDecision(
    decId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;
}
