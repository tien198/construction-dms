import { Decision } from '../../../domain/decision.entity';
import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';

export interface IDocumentSubmissionUseCase {
  initConstruction(data: CreateSubmissionCommand): Promise<Decision | void>;

  addSubmissionForNewDecision(
    conId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;

  addSubmissionForExistedDecision(
    decId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;
}
