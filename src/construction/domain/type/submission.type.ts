import { ConstructionInfor } from './construction-infor.type';
import { ConstructionPeriod } from './construction.type';
import { AdministrativeDocument } from './administrative-document.type';

export interface Submission extends AdministrativeDocument {
  period: ConstructionPeriod;
  constructionInfor?: ConstructionInfor;
  isApproved?: boolean;
}
