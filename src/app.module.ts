import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './construction/document/document.module';
import config from 'config/config';
import databaseConfig from 'config/database.config';
import { PgPoolModule } from './shared/infrastructure/database/pg-pool.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./config/.env', './config/.env.local'],
      load: [config, databaseConfig],
      skipProcessEnv: true,
      isGlobal: true,
    }),
    PgPoolModule.forRoot(),
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
