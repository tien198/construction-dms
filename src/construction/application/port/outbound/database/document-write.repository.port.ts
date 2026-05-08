import { Decision } from 'src/construction/domain/document/decision.entity';
import { Submission } from 'src/construction/domain/document/submission.entity';
import { DecisionId } from 'src/construction/domain/value-objects/document.vo';
import type { Queryable } from 'src/shared/type-ultility/i-queryable';

export interface IDocumentWriteRepository {
  // client is optional, use when it in a transaction
  // create a new decision and submission of that.
  saveNewDecision(
    conId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<DecisionId>;

  // only create new submission (and attached construction_info, bid_packages)
  saveExistingDecision(
    conId: string,
    decId: string,
    submission: Submission,
    client?: Queryable,
  ): Promise<DecisionId>;

  // update submission won't impact to submissions, it only create new snapshot for construction_info or bid_package
  editSubmission(
    conId: string,
    subId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<void>;
}
