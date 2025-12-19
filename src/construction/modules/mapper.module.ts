import { Module } from '@nestjs/common';
import { BidPackageMapper } from 'src/construction/presentation/mapper/bidPackage.mapper';
import { ConstructionInforMapper } from 'src/construction/presentation/mapper/construction-infor.mapper';
import { ConstructionMapper } from 'src/construction/presentation/mapper/construction.mapper';
import { DecisionMapper } from 'src/construction/presentation/mapper/decision.mapper';
import { NestedAdministrativeDocumentMapper } from 'src/construction/presentation/mapper/nested-administrative-document.mapper';
import { SubmissionMapper } from 'src/construction/presentation/mapper/submission.mapper';

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
