import { Module } from '@nestjs/common';
import { DocumentController } from './infrastructure/adapter/inbound/document.controller';
import { DocumentSubmissionService } from './application/service/document-submission.service';
import { DocumentQueriesService } from './application/service/document.queries.service';

import { UnitOfWork } from './infrastructure/adapter/outbound/persistence/unit-of-work';
import { DocumentQueryRepository } from './infrastructure/adapter/outbound/persistence/document-query.repository';
import { DocumentWriteRepository } from './infrastructure/adapter/outbound/persistence/document-write.repository';

@Module({
  controllers: [DocumentController],
  providers: [
    {
      provide: 'IDocumentSubmissionUseCase',
      useClass: DocumentSubmissionService,
    },
    {
      provide: 'IDocumentQueriesUseCase',
      useClass: DocumentQueriesService,
    },
    {
      provide: 'IDocumentQueryRepository',
      useClass: DocumentQueryRepository,
    },
    {
      provide: 'IDocumentWriteRepository',
      useClass: DocumentWriteRepository,
    },
    {
      provide: 'IUnitOfWork',
      useClass: UnitOfWork,
    },
  ],
  exports: ['IDocumentSubmissionUseCase'],
})
export class DocumentModule {}
