import { Module } from '@nestjs/common';
import { ConstructionDocumentService } from './construction-document.service';
import { ConstructionDocumentController } from './construction-document.controller';
import { ConstructionModule } from 'src/construction/construction.module';

@Module({
  imports: [ConstructionModule],
  controllers: [ConstructionDocumentController],
  providers: [ConstructionDocumentService],
})
export class ConstructionDocumentModule {}
