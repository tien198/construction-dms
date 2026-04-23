import { ConstructionResDto } from '../../../dto/response/get-constructions.res-dto';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from '../../../dto/response/get-decision-detail.res-dto';
import { DecisionResDto } from '../../../dto/response/get-decision.res-dto';
import { DecisionRow } from 'src/construction/document/infrastructure/adapter/outbound/persistence/model/decision.row';
import { ConstructionRow } from 'src/construction/document/infrastructure/adapter/outbound/persistence/model/construction.row';

export interface IDocumentQueryRepository {
  findConstructionById(id: string): Promise<ConstructionRow | undefined>;

  findConstructionsList(): Promise<ConstructionResDto[]>;

  findDecisionById(id: string): Promise<DecisionRow | undefined>;

  findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
  ): Promise<DecisionDetailResDto | undefined>;

  findDecisionListOfConstruction(
    constructionId: string,
  ): Promise<DecisionResDto[]>;

  findTCTDecisionsList(): Promise<DecisionResDto[]>;

  findDecisionListOfConstruction(
    constructionId: string,
  ): Promise<DecisionDetailResDto[]>;
}
