import { Module } from '@nestjs/common';
import { BidPackageMapper } from 'src/construction/mapper/bidPackage.mapper';
import { ConstructionInforMapper } from 'src/construction/mapper/construction-infor.mapper';
import { ConstructionMapper } from 'src/construction/mapper/construction.mapper';
import { DecisionMapper } from 'src/construction/mapper/decision.mapper';
import { NestedAdministrativeDocumentMapper } from 'src/construction/mapper/nested-administrative-document.mapper';
import { SubmissionMapper } from 'src/construction/mapper/submission.mapper';

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
