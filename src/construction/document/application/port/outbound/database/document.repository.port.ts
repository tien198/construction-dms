import { Decision } from '../../../../domain/decision.entity';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from '../../../dto/response/get-decision-detail.res-dto';
import { DecisionResDto } from '../../../dto/response/get-decision.res-dto';

// client is a dedicated db client (maybe pool client), used for transaction

/**
 * IDocumentRepository — Aggregate-focused repository for Decision aggregate root.
 * All persistence operations go through the aggregate root.
 * The implementation handles saving/loading child entities
 * (Construction, Submission, AdministrativeDocument, ConstructionInfoSnapshot, BidPackageSnapshot)
 * to their respective tables.
 */
export interface IDocumentRepository {
  // Save the entire Decision aggregate (creates or updates all child entities)
  saveDecision(decision: Decision, client?: any): Promise<Decision>;

  // Find
  findDecisionById(id: string, client?: any): Promise<Decision>;
  findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
    client?: any,
  ): Promise<DecisionDetailResDto | undefined>;
  findDecisionListOfConstruction(
    constructionId: string,
    client?: any,
  ): Promise<DecisionResDto[]>;
  findTCTDecisionsList(client?: any): Promise<DecisionResDto[]>;
  findDecisionByConstructionId(
    constructionId: string,
    client?: any,
  ): Promise<Decision | undefined>;
}
