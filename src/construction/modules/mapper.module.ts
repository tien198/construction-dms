import { Module } from '@nestjs/common';
import { BidPackageMapper } from 'src/construction/infrastructure/mapper/bidPackage.mapper';
import { ConstructionInforMapper } from 'src/construction/infrastructure/mapper/construction-infor.mapper';
import { ConstructionMapper } from 'src/construction/infrastructure/mapper/construction.mapper';
import { DecisionMapper } from 'src/construction/infrastructure/mapper/decision.mapper';
import { NestedAdministrativeDocumentMapper } from 'src/construction/infrastructure/mapper/nested-administrative-document.mapper';
import { SubmissionMapper } from 'src/construction/infrastructure/mapper/submission.mapper';

@Module({
  providers: [
    ConstructionMapper,
    ConstructionInforMapper,
    DecisionMapper,
    SubmissionMapper,
    BidPackageMapper,
    NestedAdministrativeDocumentMapper,
  ],
  exports: [
    ConstructionMapper,
    ConstructionInforMapper,
    DecisionMapper,
    SubmissionMapper,
    BidPackageMapper,
    NestedAdministrativeDocumentMapper,
  ],
})
export class MapperModule {}
