import type { DecisionResDto } from '../../dto/response/get-decision.res-dto';
import { GetDecisionQuery } from '../../queries/get-decision/get-decision.query';
import type { ConstructionResDto } from '../../dto/response/get-constructions-list.res-dto';

export interface IDocumentQueriesUseCase {
  getDecision(query: GetDecisionQuery): Promise<DecisionResDto>;
  getConstructionsList(): Promise<ConstructionResDto[]>;
}
