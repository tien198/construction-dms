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
  isChangeConstructionInfor: boolean = false;

  constructor(dec?: Omit<InfraDecisionImp, 'formatDate'>) {
    super(dec);
    if (dec) {
      for (const k in dec) {
        if (Object.hasOwn(this, k) && dec[k]) {
          this[k] = dec[k as keyof Omit<Decision, 'submission'>];
        }
      }
    }
  }
}
