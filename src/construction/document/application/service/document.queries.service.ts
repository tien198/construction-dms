import { Inject, Injectable } from '@nestjs/common';
import type { IDocumentQueriesUseCase } from '../port/inbound/document.queries.use-case';
import type { DecisionDetailResDto } from '../dto/response/get-decision-detail.res-dto';
import type { GetDecisionQuery } from '../queries/get-decision/get-decision.query';
import type { IDocumentRepository } from '../port/outbound/database/document.repository.port';
import type { IConstructionRepository } from '../port/outbound/database/construction.repository.port';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { ConstructionResDto } from '../dto/response/get-constructions.res-dto';
import { DecisionResDto } from '../dto/response/get-decision.res-dto';

@Injectable()
export class DocumentQueriesService implements IDocumentQueriesUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepo: IDocumentRepository,
    @Inject('IConstructionRepository')
    private readonly constructionRepo: IConstructionRepository,
  ) {}

  async getDecision(query: GetDecisionQuery): Promise<DecisionDetailResDto> {
    const { constructionId, period } = query;
    const decision = await this.documentRepo.findDecisionByPeriod(
      constructionId,
      period.toUpperCase() as ConstructionPeriod,
    );
    return decision;
  }

  async getDecisionListOfConstruction(
    conId: string,
  ): Promise<DecisionResDto[]> {
    const decisionList =
      await this.documentRepo.findDecisionListOfConstruction(conId);
    return decisionList;
  }

  async getConstructionsList(): Promise<ConstructionResDto[]> {
    const consList = await this.constructionRepo.findConstructionsList();
    return consList;
  }
}
