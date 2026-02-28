import { ConstructionPeriod } from './construction.type';
import { PrintDocument } from './print-administrative-document.type';
import { PrintConstructionInfor } from './print-cnstruction-infor.type';

export type PrintNestedSubmission = Omit<
  PrintDocument,
  keyof PrintConstructionInfor
>;

export interface PrintDecision extends PrintDocument {
  period: ConstructionPeriod;
  isApproved: boolean;
  submission: PrintNestedSubmission;

  isChangeConstructionInfor?: boolean;
}
