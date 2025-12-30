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
    if (sub) {
      for (const k in sub) {
        if (Object.hasOwn(this, k)) {
          this[k] = sub[k as keyof SubmissionImp];
        }
      }
    }
  }
}
