import { Inject, Injectable } from '@nestjs/common';

import type { IUnitOfWork } from 'src/construction/application/port/outbound/database/i-unit-of-work.port';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.enum';
import { DecisionDetailResDto } from 'src/construction/application/dto/response/get-decision-detail.res-dto';
import { DecisionResDto } from 'src/construction/application/dto/response/get-decision.res-dto';
import { ConstructionResDto } from 'src/construction/application/dto/response/get-constructions.res-dto';
import { DocumentBaseRepo } from './document-base.repository';
import { IDocumentQueryRepository } from 'src/construction/application/port/outbound/database/document-query.repository.port';
import { DecisionRow } from './model/decision.row';
import { ConstructionRow } from './model/construction.row';

@Injectable()
export class DocumentQueryRepository
  extends DocumentBaseRepo
  implements IDocumentQueryRepository
{
  constructor(
    connectionService: PgConnectionService,
    @Inject('IUnitOfWork') uow: IUnitOfWork,
  ) {
    super(connectionService, uow);
  }
  // Construction

  async findConstructionById(id: string): Promise<ConstructionRow | undefined> {
    const query = this._getQueryFromFile('find-construction-by-id.sql');
    const result = await this._poolClient.query(query, [id]);
    return result.rows[0] as ConstructionRow | undefined;
  }

  async findConstructionsList(): Promise<ConstructionResDto[]> {
    const query = this._getQueryFromFile('find-constructions-list.sql');
    const result = await this._poolClient.query(query);
    return result.rows as ConstructionResDto[];
  }

  // Decision
  async findDecisionById(id: string): Promise<DecisionRow | undefined> {
    const query = this._getQueryFromFile('find-decision-by-id.sql');
    const result = await this._poolClient.query(query, [id]);
    return result.rows[0] as DecisionRow | undefined;
  }

  async findDecisionByPeriod(
    constructionId: string,
    period: ConstructionPeriod,
  ): Promise<DecisionDetailResDto | undefined> {
    const query = this._getQueryFromFile('find-decision-by-period.sql');
    const result = await this._poolClient.query(query, [
      constructionId,
      period,
    ]);
    return result.rows[0] as DecisionDetailResDto | undefined;
  }

  async findTCTDecisionsList(): Promise<DecisionResDto[]> {
    const query = this._getQueryFromFile('find-tct-decisions-list.sql');
    const result = await this._poolClient.query(query);
    return result.rows as DecisionResDto[];
  }

  async findDecisionListOfConstruction(
    constructionId: string,
  ): Promise<DecisionDetailResDto[]> {
    const query = this._getQueryFromFile(
      'find-decision-list-of-construction.sql',
    );
    const result = await this._poolClient.query(query, [constructionId]);
    return result.rows as DecisionDetailResDto[];
  }
}
