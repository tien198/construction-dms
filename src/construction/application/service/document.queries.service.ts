import { Inject, Injectable } from '@nestjs/common';
import type { IDocumentQueriesUseCase } from '../port/inbound/document.queries.use-case';
import type { IDocumentQueryRepository } from '../port/outbound/database/document-query.repository.port';
import type { IConstructionQueryRepository } from '../port/outbound/database/construction-query.repository.port';
import type { DecisionDetailResDto } from '../dto/response/get-decision-detail.res-dto';
import type { GetDecisionQuery } from '../queries/get-decision/get-decision.query';

import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { ConstructionResDto } from '../dto/response/get-constructions.res-dto';
import { DecisionResDto } from '../dto/response/get-decision.res-dto';

@Injectable()
export class DocumentQueriesService implements IDocumentQueriesUseCase {
  constructor(
    @Inject('IDocumentQueryRepository')
    private readonly _docQueryRepo: IDocumentQueryRepository,
    @Inject('IConstructionQueryRepository')
    private readonly _conQueryRepo: IConstructionQueryRepository,
  ) {}

  async getDecision(
    query: GetDecisionQuery,
  ): Promise<DecisionDetailResDto | undefined> {
    const { constructionId, period } = query;
    const decision = await this._docQueryRepo.findDecisionByPeriod(
      constructionId,
      period.toUpperCase() as ConstructionPeriod,
    );
    return decision;
  }

  async getConstructionsList(): Promise<ConstructionResDto[]> {
    const consList = await this._conQueryRepo.findConstructionsList();
    return consList;
  }

  async getDecisionListOfConstruction(
    conId: string,
  ): Promise<DecisionResDto[]> {
    const decisionList =
      await this._docQueryRepo.findDecisionListOfConstruction(conId);
    return decisionList;
  }

  async getTCT_DecisionsList(): Promise<DecisionResDto[]> {
    const decision = await this._docQueryRepo.findTCTDecisionsList();
    return decision;
  }
}
