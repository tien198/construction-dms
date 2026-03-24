import { Module } from '@nestjs/common';
import { DecisionController } from './infrastructure/adapter/inbound/decision.controller';
import { DecisionService } from './application/service/decision.service';
import { PgDecisionRepository } from './infrastructure/adapter/outbound/pg-decision.repository';

import { PgBaseDecisionRepository } from './infrastructure/adapter/outbound/repositories/pg-base-decision.repository';
import { PgSubmissionRepository } from './infrastructure/adapter/outbound/repositories/pg-submission.repository';
import { PgAdministrativeDocumentRepository } from './infrastructure/adapter/outbound/repositories/pg-administrative-document.repository';
import { PgBidPackageSnapshotRepository } from './infrastructure/adapter/outbound/repositories/pg-bid-package-snapshot.repository';
import { PgConstructionInfoSnapshotRepository } from './infrastructure/adapter/outbound/repositories/pg-construction-info-snapshot.repository';

@Module({
  controllers: [DecisionController],
  providers: [
    {
      provide: 'IDecisionUseCase',
      useClass: DecisionService,
    },
    {
      provide: 'IDecisionRepository',
      useClass: PgDecisionRepository,
    },
    PgBaseDecisionRepository,
    PgSubmissionRepository,
    PgAdministrativeDocumentRepository,
    PgBidPackageSnapshotRepository,
    PgConstructionInfoSnapshotRepository,
  ],
  exports: ['IDecisionUseCase'],
})
export class DecisionModule {}
