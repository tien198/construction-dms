import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { IUnitOfWork } from 'src/construction/application/port/outbound/database/i-unit-of-work.port';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';

export class BaseRepo {
  protected readonly _poolClient: Pool;
  protected readonly _uow: IUnitOfWork;

  constructor(connectionService: PgConnectionService, uow: IUnitOfWork) {
    this._poolClient = connectionService.pool;
    this._uow = uow;
  }

  protected _getQueryFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, 'sql', 'dql', ...pathName),
      'utf-8',
    );
  }
}
