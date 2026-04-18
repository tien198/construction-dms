import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { AdministrativeDocument } from './administrative-document.entity';
import { DecisionId } from './value-objects/document.vo';
import type { IDecision } from './domain-primitive/i-decision';
import { Submission } from './submission.entity';
import { v7 } from 'uuid';

export class Decision implements IDecision {
  constructor(
    public document: AdministrativeDocument | DecisionId,
    public period: ConstructionPeriod,
    public is_change_construction_info: boolean = false,

    // reference to administrative-document
    public submission: Submission,
  ) {
    if (this.id.value != null) {
      return;
    }

    if (this.document instanceof DecisionId) {
      this.document = DecisionId.create(v7());
    } else if (this.document instanceof AdministrativeDocument) {
      this.document.id = DecisionId.create(v7());
    }
  }

  get id(): DecisionId {
    if (this.document instanceof AdministrativeDocument) {
      return this.document.id;
    }
    return this.document;
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
