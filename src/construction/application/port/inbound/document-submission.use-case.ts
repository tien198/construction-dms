import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { Construction } from 'src/construction/domain/construction/construction.entity';

export interface IDocumentSubmissionUseCase {
  initConstruction(data: CreateSubmissionCommand): Promise<Construction | void>;

  // addTvTt(
  //   conId: string,
  //   data: CreateSubmissionCommand,
  // ): Promise<Construction | void>;

  addSubmissionForNewDecision(
    conId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;

  addSubmissionForExistedDecision(
    decId: string,
    data: CreateSubmissionCommand,
  ): Promise<Decision | void>;
}
