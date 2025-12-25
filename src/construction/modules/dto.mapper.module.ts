import { Module } from '@nestjs/common';
import { BidPackageMapper } from 'src/construction/presentation/mapper/bidPackage.dto.mapper';
import { ConstructionInforMapper } from 'src/construction/presentation/mapper/construction-infor.dto.mapper';
import { ConstructionMapper } from 'src/construction/presentation/mapper/construction.dto.mapper';
import { DecisionMapper } from 'src/construction/presentation/mapper/decision.dto.mapper';
import { NestedAdministrativeDocumentMapper } from 'src/construction/presentation/mapper/nested-administrative-document.dto.mapper';
import { SubmissionMapper } from 'src/construction/presentation/mapper/submission.dto.mapper';

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
