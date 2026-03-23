import type { AdministrativeDocument } from './create-administrative-document.type';
import type { ConstructionPeriod } from './create-construction.type';
import type { Submission } from './create-submission.type';

export interface Decision extends AdministrativeDocument {
  period: ConstructionPeriod;
  submission: Submission;
}
