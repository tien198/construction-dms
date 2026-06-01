import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from 'src/construction/application/queries/get-decision-detail/get-decision-detail.query';
import { DecisionResDto } from '../../../dto/response/get-decision.res-dto';
import { DecisionRow } from 'src/construction/infrastructure/adapter/outbound/persistence/model/decision.row';

export interface IDocumentQueryRepository {
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

  findDecisionBySubmissionId(
    submissionId: string,
  ): Promise<DecisionDetailResDto | undefined>;
}
