import type { DecisionResDto } from '../../dto/response/get-decision.res-dto';
import { GetDecisionQuery } from '../../queries/get-decision/get-decision.query';

export interface IDocumentQueriesUseCase {
  getDecision(query: GetDecisionQuery): Promise<DecisionResDto>;
}
