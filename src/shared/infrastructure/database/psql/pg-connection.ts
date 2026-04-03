import { Pool, PoolConfig } from 'pg';

export class PgConnection {
  readonly pool: Pool;

  constructor(config?: PoolConfig) {
    this.pool = new Pool(config);
  }

  // Acquire a dedicated client from pool. Used for transaction
  connect() {
    return this.pool.connect();
  }
}
