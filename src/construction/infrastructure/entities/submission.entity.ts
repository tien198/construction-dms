import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Submission } from 'src/construction/domain/type/submission.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

export class SubmissionImp
  extends AdministrativeDocumentImp
  implements Partial<Submission>
{
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;

  constructor(sub?: Partial<Submission>) {
    super(sub);
  }
}
