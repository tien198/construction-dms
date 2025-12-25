import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { InfraSubmissionImp } from './submission.infra.entity';
import { InfraAdministrativeDocumentImp } from './administrative-document.infra.entity';

export class InfraDecisionImp
  extends InfraAdministrativeDocumentImp
  implements Decision
{
  period: ConstructionPeriod;
  isApproved: boolean = false;
  submissions: InfraSubmissionImp[] = [];
  isChangeConstructionInfor?: boolean | undefined;

  constructor(dec?: InfraDecisionImp) {
    super(dec);
  }
}
