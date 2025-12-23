import { AdministrativeDocument } from './administrative-document.type';
import { ConstructionPeriod } from './construction.type';
import { Submission } from './submission.type';

export interface Decision extends AdministrativeDocument {
  period: ConstructionPeriod;
  submissions: Submission[];
  isApproved: boolean;
  approvedSubmissionId: string;
  isChangedConstructionInfor: boolean;
}
