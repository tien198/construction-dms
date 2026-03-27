import { v7 } from 'uuid';
import { DocumentId, PursuantToDecTCT } from '../value-objects/document.vo';
import { ConstructionInforId } from '../value-objects/construction-infor.vo';

export class Construction {
  id: DocumentId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: ConstructionInforId | null;

  constructor(
    id: DocumentId,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: ConstructionInforId | null,
  ) {
    this.id = id;
    this.pursuant_to_dec_tct_id = pursuant_to_dec_tct_id;
    this.current_snapshot_id = current_snapshot_id;
  }

  static create(
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: ConstructionInforId | null,
  ): Construction {
    return new Construction(
      new DocumentId(v7()),
      pursuant_to_dec_tct_id,
      current_snapshot_id,
    );
  }

  static reconstitute(
    id: DocumentId,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: ConstructionInforId | null,
  ): Construction {
    return new Construction(id, pursuant_to_dec_tct_id, current_snapshot_id);
  }
}
