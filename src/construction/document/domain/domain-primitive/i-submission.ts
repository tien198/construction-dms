import { ConstructionInforId } from '../value-objects/construction-infor.vo';
import { ConstructionId } from '../value-objects/construction.vo';
import { DecisionId, DocumentId } from '../value-objects/document.vo';
import { IAdministrativeDocument } from './i-administrative-document';

export interface ISubmission {
  construction_id: ConstructionId;
  decision_id: DecisionId;
  construction_infor_snapshot_id: ConstructionInforId | null;
  is_change_construction_infor?: boolean;

  // reference to administrative-document
  document: IAdministrativeDocument | DocumentId;
}
