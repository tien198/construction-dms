import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import type { PoolConfig } from 'pg';
import { PgPool } from './pg-pool';

// @Global()
@Injectable()
export class PgPoolService extends PgPool implements OnApplicationShutdown {
  constructor(@Inject('PG_POOL_OPTIONS') private poolConf: PoolConfig) {
    super(poolConf);
    console.log('-------- pool was created');
  }

  onApplicationShutdown(signal?: string) {
    console.log('-------- pool was closed', signal);
    void this.pool.end();
  }
}
