import { PrintSubmission } from '../type/print-submission.type';
import { ConstructionPeriod } from '../type/construction.type';
import { PrintDocumentImp } from './print-document.entity';
import { SubmissionViewModel } from '../viewModel/submission.view-model';

export class PrintSubmissionImp
  extends PrintDocumentImp
  implements PrintSubmission
{
  period: ConstructionPeriod;
  isApproved?: boolean;

  constructor(sub: SubmissionViewModel) {
    super(sub, sub.constructionInfor);
    this.period = sub.period;
    this.isApproved = sub.isApproved;
  }
}
