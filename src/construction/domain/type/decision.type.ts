import { AdministrativeDocument } from './administrative-document.type';
import { ConstructionInfor } from './construction-infor.type';
import { ConstructionPeriod } from './construction.type';

export interface Decision extends AdministrativeDocument {
  period: ConstructionPeriod;
  isApproved: boolean;
  // submissions: Submission[];
  constructionInfor: ConstructionInfor;

  isChangeConstructionInfor?: boolean;
}
