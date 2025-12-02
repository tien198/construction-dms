import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CatModule,
    ConstructionModule,
    DocumentModule,
  ],
})
export class AppModule {}
