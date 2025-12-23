import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { Submission } from 'src/construction/domain/type/submission.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

export class DecisionImp
  extends AdministrativeDocumentImp
  implements Partial<Decision>
{
  period: ConstructionPeriod;
  isApproved: boolean = false;
  submissions: Submission[] = [];

  constructor(dec?: Partial<Decision>) {
    super(dec);
  }
}
