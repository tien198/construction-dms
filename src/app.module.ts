import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api'],
    }),
    CatModule,
    ConstructionModule,
    DocumentModule,
  ],
})
export class AppModule {}
