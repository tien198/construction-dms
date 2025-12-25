import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Submission } from 'src/construction/domain/type/submission.type';
import { AdministrativeDocumentImp } from '../../domain/entity/administrative-document.entity';

export class InfraSubmissionImp
  extends AdministrativeDocumentImp
  implements Partial<Submission>
{
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;
  isApproved?: boolean = false;

  constructor(sub?: Submission) {
    super(sub);
  }
}
