import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Submission } from 'src/construction/domain/type/submission.type';
import { InfraAdministrativeDocumentImp } from './administrative-document.infra.entity';

export class InfraSubmissionImp
  extends InfraAdministrativeDocumentImp
  implements Partial<Submission>
{
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;
  isApproved?: boolean = false;

  constructor(sub?: Submission) {
    super(sub);
  }
}
