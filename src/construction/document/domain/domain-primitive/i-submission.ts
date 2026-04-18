import { ConstructionInfoId } from '../value-objects/construction-info.vo';
import { DocumentId } from '../value-objects/document.vo';
import { IAdministrativeDocument } from './i-administrative-document';
import { IConstructionInfoSnapshot } from './i-construction-info';

export interface ISubmission {
  construction_info_snapshot_id: ConstructionInfoId | null;
  is_change_construction_info?: boolean;
  construction_info: IConstructionInfoSnapshot;

  // reference to administrative-document
  document: IAdministrativeDocument | DocumentId;
}
