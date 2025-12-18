import { NestedAdministrativeDocument } from 'src/construction/type/administrative-document. type';
import { ConstructionPeriod } from 'src/construction/type/construction.type';
import { Decision } from 'src/construction/type/decision.type';
import { Submission } from 'src/construction/type/submission.type';

export class DecisionImp implements Partial<Decision> {
  no: string;
  level: string;
  date: Date;
  pursuantToDec_TCT: NestedAdministrativeDocument;
  pursuantToDec_TTMN?: NestedAdministrativeDocument;
  period: ConstructionPeriod;
  submissions: Submission[] = [];
  isApproved: boolean = false;

  constructor(dec?: Partial<Decision>) {
    Object.assign(this, dec);
  }
}
