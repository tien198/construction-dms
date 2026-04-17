import { v7 } from 'uuid';
import { DocumentId, PursuantToDecTCT } from './value-objects/document.vo';
import { ConstructionInfoId } from './value-objects/construction-info.vo';
import type { IConstruction } from './domain-primitive/i-construction';

export class Construction implements IConstruction {
  id: DocumentId;
  pursuant_to_dec_tct_id: PursuantToDecTCT;
  current_snapshot_id: ConstructionInfoId | null;

  constructor(
    id: DocumentId,
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: ConstructionInfoId | null,
  ) {
    this.id = id;
    this.pursuant_to_dec_tct_id = pursuant_to_dec_tct_id;
    this.current_snapshot_id = current_snapshot_id;
  }

  assignSnapshot(snapshotId: ConstructionInfoId): void {
    this.current_snapshot_id = snapshotId;
  }

  static create(
    pursuant_to_dec_tct_id: PursuantToDecTCT,
    current_snapshot_id: ConstructionInfoId | null,
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
    current_snapshot_id: ConstructionInfoId | null,
  ): Construction {
    return new Construction(id, pursuant_to_dec_tct_id, current_snapshot_id);
  }
}
