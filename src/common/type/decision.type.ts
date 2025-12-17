import { AdministrativeDocument } from './administrativeDocument. type';
import { ConstructionPeriod } from './construction.type';
import { Submission } from './submission.type';

export interface Decision extends AdministrativeDocument {
  period: ConstructionPeriod;
  submissions: Submission[];
  isApproved: boolean;
}
