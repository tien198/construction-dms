import { PursuantToDecTCT } from '../value-objects/document.vo';
import { ConstructionInfoId } from '../value-objects/construction-info.vo';
import { ConstructionId } from '../value-objects/construction.vo';

export interface IConstruction {
  id: ConstructionId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: ConstructionInfoId | null;
}
