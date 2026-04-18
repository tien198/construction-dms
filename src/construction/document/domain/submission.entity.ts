import { ISubmission } from './domain-primitive/i-submission';
import { ConstructionInfoId } from './value-objects/construction-info.vo';
import { DocumentId } from './value-objects/document.vo';
import { AdministrativeDocument } from './administrative-document.entity';
import { ConstructionInfoSnapshot } from './construction-info.entity';
import { v7 } from 'uuid';

export class Submission implements ISubmission {
  constructor(
    // reference to administrative-document
    public document: AdministrativeDocument | DocumentId,

    public construction_info_snapshot_id: ConstructionInfoId | null = null,
    public is_change_construction_info: boolean = false,

    public construction_info: ConstructionInfoSnapshot,
  ) {
    if (this.id.value != null) {
      return;
    }

    if (this.document instanceof DocumentId) {
      this.document = DocumentId.create(v7());
    } else if (this.document instanceof AdministrativeDocument) {
      this.document.id = DocumentId.create(v7());
    }
  }

  get id() {
    if (this.document instanceof AdministrativeDocument) {
      return this.document.id;
    }
    return this.document;
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
