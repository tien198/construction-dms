import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';
import { ConstructionDocumentModule } from './construction-document/construction-document.module';

@Module({
  imports: [CatModule, ConstructionModule, ConstructionDocumentModule],
})
export class AppModule {}
