import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './construction/document/document.module';
import config from 'config/config';
import databaseConfig from 'config/database.config';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

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
    DatabaseModule.forRoot(),
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
