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
    public bid_packages: BidPackageSnapshot[] | null = null,
  ) {
    if (!construction_info && !bid_packages) {
      throw new Error('Submission must have construction_info or bid_packages');
    }
    if (this.document.id.value === null) {
      this.document.id = DocumentId.create(v7());
    }
  }

  get id(): DocumentId {
    return this.document.id;
  }
}
