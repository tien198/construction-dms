import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { IUnitOfWork } from '../../../application/port/outbound/i-unit-of-work.port';
import { PgPoolService } from '../../../../../shared/infrastructure/database/pg-pool.service';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  constructor(private readonly poolService: PgPoolService) {}

  async begin(): Promise<PoolClient> {
    const client = await this.poolService.connect();
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
