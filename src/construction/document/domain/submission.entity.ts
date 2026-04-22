import { v7 } from 'uuid';
import { ISubmission } from './domain-primitive/i-submission';
import { DocumentId } from './value-objects/document.vo';
import { AdministrativeDocument } from './administrative-document.entity';
import { ConstructionInfoSnapshot } from './construction-info.entity';
import { BidPackageSnapshot } from './bid-package.entity';

/**
 * Submission — Child entity of Decision aggregate.
 */
export class Submission implements ISubmission {
  constructor(
    // embedded administrative-document (Value Object)
    public document: AdministrativeDocument,

    // child entity
    public construction_info: ConstructionInfoSnapshot | null = null,
    public bid_packages: BidPackageSnapshot[],
  ) {
    if (this.document.id.value === null) {
      this.document.id = DocumentId.create(v7());
    }
    if (this.construction_info) {
      this.is_change_construction_info = true;
    }
  }

  get id(): DocumentId {
    return this.document.id;
  }

  is_change_construction_info: boolean = false;
  // Reconstitute từ DB — dùng trong repository khi load lên
}
