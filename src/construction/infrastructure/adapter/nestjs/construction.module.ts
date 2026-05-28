import { Module } from '@nestjs/common';
import { DocumentController } from '../inbound/document.controller';
import { ConstructionInfrastructureModule } from './construction-infrastructure.module';
import { DocumentSubmissionService } from '../../../application/service/document-submission.service';
import { DocumentQueriesService } from '../../../application/service/document.queries.service';

@Module({
  controllers: [DocumentController],
  imports: [ConstructionInfrastructureModule],
  providers: [
    {
      provide: 'IDocumentSubmissionUseCase',
      useClass: DocumentSubmissionService,
    },
    {
      provide: 'IDocumentQueriesUseCase',
      useClass: DocumentQueriesService,
    },
  ],
  exports: ['IDocumentSubmissionUseCase', 'IDocumentQueriesUseCase'],
})
export class ConstructionModule {}
