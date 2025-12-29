import { ConstructionPeriod } from './construction.type';
import { PrintDocument } from './print-administrative-document.type';
import { PrintSubmission } from './print-submission.type';

export interface PrintDecision extends PrintDocument {
  period: ConstructionPeriod;
  isApproved: boolean;
  submission: PrintSubmission;
  // submissions: Submission[];

  isChangeConstructionInfor?: boolean;
}
