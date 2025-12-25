import { ConstructionInfor } from '../type/construction-infor.type';
import { ConstructionPeriod } from '../type/construction.type';
import { Submission } from '../type/submission.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

export class SubmissionImp
  extends AdministrativeDocumentImp
  implements Submission
{
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;
  isApproved?: boolean;

  constructor(sub?: Submission) {
    super(sub);
  }
}
