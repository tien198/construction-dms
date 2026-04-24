import { Pool } from 'pg';
import { IUnitOfWork } from 'src/construction/document/application/port/outbound/database/i-unit-of-work.port';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';

export class DocumentBaseRepo {
  protected readonly _poolClient: Pool;
  protected readonly _uow: IUnitOfWork;

  constructor(connectionService: PgConnectionService, uow: IUnitOfWork) {
    this._poolClient = connectionService.pool;
    this._uow = uow;
  }
}
