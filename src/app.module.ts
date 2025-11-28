import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';
import { ConstructionDocumentModule } from './construction-document/construction-document.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CatModule,
    ConstructionModule,
    ConstructionDocumentModule,
  ],
})
export class AppModule {}
