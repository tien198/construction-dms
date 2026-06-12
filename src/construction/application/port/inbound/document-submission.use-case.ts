import { CreateSubmissionCommand } from '../../commands/create-submission/create-submission.command';
import { ConstructionId } from 'src/construction/domain/value-objects/construction.vo';
import {
  DecisionId,
  DocumentId,
} from 'src/construction/domain/value-objects/document.vo';
import { SubmissionResDto } from '../../queries/get-decision-detail/dto/submission.res-dto';

export interface IDocumentSubmissionUseCase {
  initConstruction(data: CreateSubmissionCommand): Promise<ConstructionId>;

  /*
    KQ_LCNT (1 for new construction, 1 for existed construction, both only have one bid_package)
  */

  // addKqLcnt(
  //   conId: string,
  //   data: CreateSubmissionCommand,
  // ): Promise<Construction | void>;

  addSubmissionForNewDecision(
    // conId: string,
    data: CreateSubmissionCommand,
  ): Promise<DecisionId>;

  addSubmissionForExistedDecision(
    // decId: string,
    data: CreateSubmissionCommand,
  ): Promise<DecisionId>;

  editSubmission(context: EditContext): Promise<DocumentId>;
}

export type EditContext = {
  cmd: CreateSubmissionCommand;
  isDecEdit?: boolean;
};
