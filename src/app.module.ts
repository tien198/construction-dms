import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './construction/document/document.module';
import config from 'config/config';
import databaseConfig from 'config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { InfrastructureModule } from './shared/infrastructure/infrastructure.module';

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
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
