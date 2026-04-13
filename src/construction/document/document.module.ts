import { Module } from '@nestjs/common';
import { DocumentController } from './infrastructure/adapter/inbound/document.controller';
import { DocumentSubmissionService } from './application/service/document-submission.service';
import { PgDocumentRepository } from './infrastructure/adapter/outbound/database/pg-document.repository';

import { UnitOfWork } from './infrastructure/adapter/outbound/database/unit-of-work';
import { DocumentQueriesService } from './application/service/document.queries.service';
import { PgConstructionRepository } from './infrastructure/adapter/outbound/database/pg-construction.repository';

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
      provide: 'IDocumentRepository',
      useClass: PgDocumentRepository,
    },
    {
      provide: 'IConstructionRepository',
      useClass: PgConstructionRepository,
    },
    {
      provide: 'IUnitOfWork',
      useClass: UnitOfWork,
    },
  ],
  exports: ['IDocumentSubmissionUseCase'],
})
export class DocumentModule {}
