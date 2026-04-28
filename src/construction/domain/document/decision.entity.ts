import { v7 } from 'uuid';
import type { IDecision } from './domain-primitive/i-decision';
import { DecisionId } from './value-objects/document.vo';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { AdministrativeDocument } from './administrative-document.entity';
import { Submission } from './submission.entity';
import { ConstructionId } from './value-objects/construction.vo';

/**
 * Decision — Aggregate Root.
 *
 * Owns:
 *  - AdministrativeDocument (embedded VO for the decision document)
 *  - Construction (child entity)
 *  - Submission[] (child entities, each with its own AdministrativeDocument & ConstructionInfoSnapshot)
 */
export class Decision implements IDecision {
  constructor(
    // embedded administrative-document (Value Object)
    public document: AdministrativeDocument,
    public construction_id: ConstructionId,
    public period: ConstructionPeriod,

    // child entities
    public submissions: Submission[],
  ) {
    if (this.document.id.value == null) {
      this.document.id = DecisionId.create(v7());
    }
  }

  get id(): DecisionId {
    return this.document.id as DecisionId;
  }

  addSubmission(submission: Submission): void {
    this.submissions.push(submission);
  }
}
