import { ConstructionPeriod } from '../type/construction.type';
import { Decision } from '../type/decision.type';
import { Submission } from '../type/submission.type';

export class DecisionImp implements Decision {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: string;
  pursuantToDec_TTMN: string;
  period: ConstructionPeriod;
  submissions: Submission[];
  isApproved: boolean;
}
