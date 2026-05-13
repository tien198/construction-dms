import type {
  GetDecisionQuery,
  DecisionDetailResDto,
} from 'src/construction/application/queries/get-decision-detail/get-decision-detail.query';
import type { ConstructionResDto } from '../../dto/response/get-constructions.res-dto';
import type { DecisionResDto } from '../../dto/response/get-decision.res-dto';

export interface IDocumentQueriesUseCase {
  getDecision(
    query: GetDecisionQuery,
  ): Promise<DecisionDetailResDto | undefined>;
  getConstructionsList(): Promise<ConstructionResDto[]>;
  getDecisionListOfConstruction(conId: string): Promise<DecisionResDto[]>;
  getTCT_DecisionsList(): Promise<DecisionResDto[]>;
}
