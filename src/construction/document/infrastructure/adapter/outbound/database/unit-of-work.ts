import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { IUnitOfWork } from '../../../../application/port/outbound/database/i-unit-of-work.port';
import { PgConnectionService } from '../../../../../../shared/infrastructure/database/psql/pg-connection.service';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  constructor(private readonly pgService: PgConnectionService) {}

  async begin(): Promise<PoolClient> {
    const client = await this.pgService.pool.connect();
    await client.query('BEGIN');
    return client;
  }

  async commit(client: PoolClient): Promise<void> {
    try {
      await client.query('COMMIT');
    } finally {
      client.release();
    }
  }

  async rollback(client: PoolClient): Promise<void> {
    try {
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }
}
