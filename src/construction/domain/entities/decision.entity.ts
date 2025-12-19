import { NestedAdministrativeDocument } from 'src/construction/domain/type/administrative-document. type';
import { ConstructionPeriod } from 'src/construction/domain/type/construction.type';
import { Decision } from 'src/construction/domain/type/decision.type';
import { Submission } from 'src/construction/domain/type/submission.type';

export class DecisionImp implements Partial<Decision> {
  id: string;
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
