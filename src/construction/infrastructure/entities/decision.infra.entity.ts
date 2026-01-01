import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { InfraSubmissionImp } from './submission.infra.entity';
import { InfraAdministrativeDocumentImp } from './administrative-document.infra.entity';

type InfraDecision = Omit<Decision, 'submission'>;

export class InfraDecisionImp
  extends InfraAdministrativeDocumentImp
  implements InfraDecision
{
  period: ConstructionPeriod;
  isApproved: boolean = false;
  submissions: InfraSubmissionImp[] = [];
  isChangeConstructionInfor: boolean = false;

  constructor(dec?: Decision) {
    super(dec);
    if (dec) {
      for (const k in dec) {
        if (Object.hasOwn(this, k) && dec[k]) {
          this[k] = dec[k as keyof InfraDecision];
        }
      }
    }
    if (dec?.submission) {
      this.submissions = [new InfraSubmissionImp(dec.submission)];
    }
  }
}
