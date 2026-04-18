import { v7 } from 'uuid';
import { DocumentId, PursuantToDecTCT } from './value-objects/document.vo';
import { ConstructionInfoId } from './value-objects/construction-info.vo';
import type { IConstruction } from './domain-primitive/i-construction';

export class Construction implements IConstruction {
  constructor(
    public id: DocumentId,
    public pursuant_to_dec_tct_id: PursuantToDecTCT,
    public current_snapshot_id: ConstructionInfoId | null,
  ) {
    if (id.value === null) {
      this.id = DocumentId.create(v7());
    }
  }

  assignSnapshot(snapshotId: ConstructionInfoId): void {
    this.current_snapshot_id = snapshotId;
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
