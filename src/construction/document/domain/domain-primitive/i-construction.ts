import { DocumentId, PursuantToDecTCT } from '../value-objects/document.vo';
import { ConstructionInfoId } from '../value-objects/construction-info.vo';

export interface IConstruction {
  id: DocumentId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: ConstructionInfoId | null;
}
