import { ConstructionPeriod } from './construction.type';
import { PrintDocument } from './print-administrative-document.type';
import { PrintConstructionInfor } from './print-cnstruction-infor.type';

export interface PrintSubmission extends PrintDocument {
  period: ConstructionPeriod;
  constructionInfor?: PrintConstructionInfor;
  isApproved?: boolean;
}
