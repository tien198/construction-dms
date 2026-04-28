import { Inject, Injectable } from '@nestjs/common';

import type { IUnitOfWork } from 'src/construction/application/port/outbound/database/i-unit-of-work.port';

import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { ConstructionResDto } from 'src/construction/application/dto/response/get-constructions.res-dto';
import { BaseRepo } from './base.repository';
import { ConstructionRow } from './model/construction.row';
import { IConstructionQueryRepository } from 'src/construction/application/port/outbound/database/construction-query.repository.port';

@Injectable()
export class ConstructionQueryRepository
  extends BaseRepo
  implements IConstructionQueryRepository
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
}
