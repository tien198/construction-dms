import { ConstructionPeriod } from '../type/construction.type';
import { Decision } from '../type/decision.type';
import { Submission } from '../type/submission.type';
import { AdministrativeDocumentImp } from './administrative-document.entity';

export class DecisionImp extends AdministrativeDocumentImp implements Decision {
  period: ConstructionPeriod;
  isApproved: boolean;
  submission?: Submission;
  isChangeConstructionInfor?: boolean | undefined;

  constructor(dec?: DecisionImp) {
    super(dec);
  }
}
