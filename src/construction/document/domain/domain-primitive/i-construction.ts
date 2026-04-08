import { DocumentId, PursuantToDecTCT } from '../value-objects/document.vo';
import { ConstructionInforId } from '../value-objects/construction-infor.vo';

export interface IConstruction {
  id: DocumentId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: ConstructionInforId | null;
}
