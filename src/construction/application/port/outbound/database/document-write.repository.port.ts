import { Decision } from 'src/construction/domain/document/decision.entity';
import type { Queryable } from 'src/shared/type-ultility/i-queryable';

export interface IDocumentWriteRepository {
  // client is optional, use when it in a transaction
  // create a new decision and submission of that.
  saveNewDecision(
    conId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<Decision>;

  // only create new submission (and attached construction_info, bid_packages)
  saveExistingDecision(
    decId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<Decision>;

  // update submission won't impact to submissions, it only create new snapshot for construction_info or bid_package
  editSubmission(
    conId: string,
    subId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<void>;
}
