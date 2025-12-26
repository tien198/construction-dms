import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { InfraSubmissionImp } from './submission.infra.entity';
import { InfraAdministrativeDocumentImp } from './administrative-document.infra.entity';

export class InfraDecisionImp
  extends InfraAdministrativeDocumentImp
  implements Omit<Decision, 'submission'>
{
  period: ConstructionPeriod;
  isApproved: boolean = false;
  submissions: InfraSubmissionImp[] = [];
  isChangeConstructionInfor?: boolean | undefined;

  constructor(dec?: Omit<InfraDecisionImp, 'formatDate'>) {
    super(dec);
  }
}
