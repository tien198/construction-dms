import { Module } from '@nestjs/common';
import { DocumentController } from './infrastructure/adapter/inbound/document.controller';
import { DocumentCreateService } from './application/service/document-create.service';
import { PgDocumentRepository } from './infrastructure/adapter/outbound/database/pg-document.repository';

import { UnitOfWork } from './infrastructure/adapter/outbound/database/unit-of-work';

@Module({
  controllers: [DocumentController],
  providers: [
    {
      provide: 'IDocumentCreateUseCase',
      useClass: DocumentCreateService,
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
  exports: ['IDocumentCreateUseCase'],
})
export class DocumentModule {}
