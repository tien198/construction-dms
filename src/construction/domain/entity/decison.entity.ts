import { ConstructionInfor } from '../type/construction-infor.type';
import { ConstructionPeriod } from '../type/construction.type';
import { Decision } from '../type/decision.type';
import { Submission } from '../type/submission.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

export class DecisionImp
  extends AdministrativeDocumentImp
  implements Omit<Decision, 'submissions'>
{
  period: ConstructionPeriod;
  isApproved: boolean;
  approvedSubmission?: Submission;
  constructionInfor: ConstructionInfor;

  constructor(dec?: DecisionImp) {
    super(dec);
  }
}
