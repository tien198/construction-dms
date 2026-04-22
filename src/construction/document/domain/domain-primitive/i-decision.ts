import { ConstructionId } from '../value-objects/construction.vo';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { IAdministrativeDocument } from './i-administrative-document';
import { ISubmission } from './i-submission';

export interface IDecision {
  // embedded administrative-document (Value Object)
  document: IAdministrativeDocument;
  period: ConstructionPeriod;

  // child entities
  construction_id: ConstructionId;
  submissions: ISubmission[];
}
