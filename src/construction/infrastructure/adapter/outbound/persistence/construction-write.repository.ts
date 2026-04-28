import { Inject, Injectable } from '@nestjs/common';
import { Construction } from 'src/construction/domain/construction/construction.entity';
import { IConstructionWriteRepository } from 'src/construction/application/port/outbound/database/construction-write.repository.port';
import { BaseRepo } from './base.repository';
import { ConstructionWritePersistence } from './persistence-helper/construction-write.persistence';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import type { IUnitOfWork } from 'src/construction/application/port/outbound/database/i-unit-of-work.port';
import { PoolClient } from 'pg';
import { ConstructionMapper } from './mapper/construction.mapper';

@Injectable()
export class ConstructionWriteRepository
  extends BaseRepo
  implements IConstructionWriteRepository
{
  // temporary, hard-dependency
  private readonly _conPersist = new ConstructionWritePersistence();
  constructor(
    connectionService: PgConnectionService,
    @Inject('IUnitOfWork') uow: IUnitOfWork,
  ) {
    super(connectionService, uow);
  }
  async saveConstruction(
    con: Construction,
    client?: PoolClient,
  ): Promise<Construction> {
    const row = ConstructionMapper.toPersistence(con);
    await this._conPersist.save(client ?? this._poolClient, row);
    return con;
  }
}
