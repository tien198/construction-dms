import { AdministrativeDocument } from 'src/construction/domain/document/administrative-document.entity';
import { Decision } from 'src/construction/domain/document/decision.entity';
import { Submission } from 'src/construction/domain/document/submission.entity';
import {
  DecisionId,
  DocumentId,
} from 'src/construction/domain/value-objects/document.vo';
import type { Queryable } from 'src/shared/type-ultility/i-queryable';

export interface IDocumentWriteRepository {
  // client is optional, use when it in a transaction
  // create a new decision and submission of that.
  saveNewDecision(
    conId: string,
    decision: Decision,
    client?: Queryable,
  ): Promise<DecisionId>;

  saveSubmission(
    conId: string,
    decId: string,
    subDomain: Submission,
    client?: Queryable,
  ): Promise<DocumentId>;

  updateSubmission(
    conId: string,
    subDomain: Submission,
    decAdDoc: AdministrativeDocument | null,
    client?: Queryable,
  ): Promise<DocumentId>;
}
