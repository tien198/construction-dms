import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import config from 'config/config';
import databaseConfig from 'config/database.config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { InfrastructureModule } from './shared/infrastructure/infrastructure.module';
import { ConstructionModule } from './construction/infrastructure/adapter/nestjs/construction.module';
import { BidderModule } from './bidder/infrastructure/nestjs/bidder.module';
import { ContractModule } from './contract/infrastructure/nestjs/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./config/.env', './config/.env.local'],
      load: [config, databaseConfig],
      skipProcessEnv: true,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('client', 'dist'),
      exclude: ['/api'],
    }),
    InfrastructureModule,
    ConstructionModule,
    BidderModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
