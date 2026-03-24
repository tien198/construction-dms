import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DecisionModule } from './construction/decision/decision.module';
import configuration from 'config/configuration';
import databaseConfig from 'config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./config/.env', './config/.env.local'],
      load: [configuration, databaseConfig],
      skipProcessEnv: true,
      isGlobal: true,
    }),
    DecisionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
