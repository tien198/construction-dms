import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import type { PoolConfig } from 'pg';
import { PgConnection } from './pg-connection';
import { PgSchemaInitializerService } from './schema/pg-shema-initializer.service';
import { ModuleRef } from '@nestjs/core';

// @Global()
@Injectable()
export class PgConnectionService
  extends PgConnection
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  constructor(
    @Inject('PG_POOL_OPTIONS') private readonly poolConf: PoolConfig,
    private readonly moduleRef: ModuleRef,
  ) {
    super(poolConf);
    console.log('-------- pool was created');
  }

  async onApplicationBootstrap() {
    const initializer = this.moduleRef.create(PgSchemaInitializerService);
    await (await initializer).init();
  }

  onApplicationShutdown(signal?: string) {
    console.log('-------- pool was closed', signal);
    void this.pool.end();
  }
}
