import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { GlobalModule } from './global.module.';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve('client', 'dist'),
      exclude: ['/api'],
    }),
    GlobalModule,
    CatModule,
    ConstructionModule,
  ],
})
export class AppModule {}
