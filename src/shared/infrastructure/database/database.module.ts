import { DynamicModule, Module } from '@nestjs/common';
import { PgConnectionService } from './psql/pg-connection.service';
import { ConfigService } from '@nestjs/config';
import { DbConfig } from 'config/database.config.type';
import { PoolConfig } from 'pg';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      global: true,
      providers: [
        {
          provide: 'PG_POOL_OPTIONS',
          useFactory: (configService: ConfigService) => {
            const dbConf = configService.get<DbConfig>('db');
            const poolConfig: PoolConfig = {
              host: dbConf?.postgres.host,
              port: dbConf?.postgres.port,
              user: dbConf?.postgres.user,
              password: dbConf?.postgres.password,
              database: dbConf?.postgres.database,
            };
            return poolConfig;
          },
          inject: [ConfigService],
        },
        // {
        //   provide: PgPoolService,
        //   useFactory: (poolConfig: PoolConfig) => {
        //     return new PgPoolService(poolConfig);
        //   },
        //   inject: ['PG_POOL_OPTIONS'],
        // },
        PgConnectionService,
      ],
      exports: [PgConnectionService],
    };
  }
}
