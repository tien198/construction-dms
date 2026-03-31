import { OnApplicationShutdown } from '@nestjs/common';
import { PoolConfig } from 'pg';
import { PgPool } from './pg-pool';

// @Global()
// @Injectable()
export class PgPoolService extends PgPool implements OnApplicationShutdown {
  constructor(poolConf: PoolConfig) {
    super(poolConf);
    console.log('-------- pool was created');
  }

  onApplicationShutdown(signal?: string) {
    console.log('-------- pool was closed', signal);
    void this.pool.end();
  }
}
