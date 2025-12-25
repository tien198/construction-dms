import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { AdministrativeDocumentImp } from '../../domain/entity/administrative-document.entity';
import { ConstructionInfor } from 'src/construction/domain/type/construction-infor.type';
import { InfraSubmissionImp } from './submission.infra.entity';

export class InfraDecisionImp
  extends AdministrativeDocumentImp
  implements Decision
{
  period: ConstructionPeriod;
  isApproved: boolean = false;
  submissions: InfraSubmissionImp[] = [];
  constructionInfor: ConstructionInfor;
  isChangeConstructionInfor?: boolean | undefined;

  constructor(dec?: Decision) {
    super(dec);
  }
}
