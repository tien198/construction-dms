import { Module } from '@nestjs/common';
import { DocumentController } from './infrastructure/adapter/inbound/document.controller';
import { DocumentService } from './application/service/document.service';
import { PgDocumentRepository } from './infrastructure/adapter/outbound/pg-document.repository';

import { UnitOfWork } from './infrastructure/adapter/outbound/unit-of-work';

@Module({
  controllers: [DocumentController],
  providers: [
    {
      provide: 'IDocumentUseCase',
      useClass: DocumentService,
    },
    {
      provide: 'IDocumentRepository',
      useClass: PgDocumentRepository,
    },
    {
      provide: 'IUnitOfWork',
      useClass: UnitOfWork,
    },
  ],
  exports: ['IDocumentUseCase'],
})
export class DocumentModule {}
