import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';
import { IAdministrativeDocument } from './i-administrative-document';
import { ConstructionId } from '../value-objects/construction.vo';
import { DecisionId } from '../value-objects/document.vo';

export interface IDecision {
  construction_id: ConstructionId;
  is_change_construction_infor?: boolean;
  period: ConstructionPeriod;

  // reference to administrative-document
  document: IAdministrativeDocument | DecisionId;
}
