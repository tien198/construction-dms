import { ConstructionInfoId } from '../value-objects/construction-info.vo';
import { ConstructionId } from '../value-objects/construction.vo';
import { DecisionId, DocumentId } from '../value-objects/document.vo';
import { IAdministrativeDocument } from './i-administrative-document';

export interface ISubmission {
  construction_id: ConstructionId;
  decision_id: DecisionId;
  construction_info_snapshot_id: ConstructionInfoId | null;
  is_change_construction_info?: boolean;

  // reference to administrative-document
  document: IAdministrativeDocument | DocumentId;
}
