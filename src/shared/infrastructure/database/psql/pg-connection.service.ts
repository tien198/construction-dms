import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import type { PoolConfig } from 'pg';
import { PgConnection } from './pg-connection';
import { PgSchemaInitializerService } from './schema/pg-shema-initializer.service';

// @Global()
@Injectable()
export class PgConnectionService
  extends PgConnection
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  constructor(
    @Inject('PG_POOL_OPTIONS') private readonly poolConf: PoolConfig,
  ) {
    super(poolConf);
    console.log('-------- pool was created');
  }

  async onApplicationBootstrap() {
    const initializer = new PgSchemaInitializerService(this.poolConf);
    await initializer.init();
  }

  onApplicationShutdown(signal?: string) {
    console.log('-------- pool was closed', signal);
    void this.pool.end();
  }
}
