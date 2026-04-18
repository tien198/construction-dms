import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { IAdministrativeDocument } from './i-administrative-document';
import { DecisionId } from '../value-objects/document.vo';
import { ISubmission } from './i-submission';

export interface IDecision {
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;
  submission: ISubmission;
  // reference to administrative-document
  document: IAdministrativeDocument | DecisionId;
}
