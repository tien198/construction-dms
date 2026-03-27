import { Module } from '@nestjs/common';
import { DocumentController } from './infrastructure/adapter/inbound/document.controller';
import { DocumentService } from './application/service/decision.service';
import { PgDocumentRepository } from './infrastructure/adapter/outbound/pg-decision.repository';

import { PgDecisionRepository } from './infrastructure/adapter/outbound/repositories/pg-base-decision.repository';
import { PgSubmissionRepository } from './infrastructure/adapter/outbound/repositories/pg-submission.repository';
import { PgAdministrativeDocumentRepository } from './infrastructure/adapter/outbound/repositories/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository } from './infrastructure/adapter/outbound/repositories/pg-bid-package-snapshot.repository';
import { PgConstructionInfoSnapshotRepository } from './infrastructure/adapter/outbound/repositories/pg-construction-info-snapshot.repository';

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
    PgDecisionRepository,
    PgSubmissionRepository,
    PgAdministrativeDocumentRepository,
    PgBidPackageSnapshotRepository,
    PgConstructionInfoSnapshotRepository,
  ],
  exports: ['IDocumentUseCase'],
})
export class DocumentModule {}
