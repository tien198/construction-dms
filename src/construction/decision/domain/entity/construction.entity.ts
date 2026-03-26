import { v7 } from 'uuid';
import { DocumentId } from '../value-objects/document-id.vo';
import { PursuantToDecTCT } from '../value-objects/pursuant-to-dec.vo';

export class Construction {
  id: DocumentId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: string;

  constructor(
    id: DocumentId,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: string,
  ) {
    this.id = id;
    this.pursuant_to_dec_tct_id = pursuant_to_dec_tct_id;
    this.current_snapshot_id = current_snapshot_id;
  }

  static create(
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: string,
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
    current_snapshot_id: string,
  ): Construction {
    return new Construction(id, pursuant_to_dec_tct_id, current_snapshot_id);
  }
}
