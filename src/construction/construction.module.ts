import { Module } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { ConstructionController } from './construction.controller';
import { DocumentModule } from 'src/document/document.module';
import { ConstructionMapper } from 'src/common/mapper/construction.mapper';
import { BidPackageMapper } from 'src/common/mapper/bidPackage.mapper';
import { ConstructionInforMapper } from 'src/common/mapper/construction-infor.mapper';
import { SubmissionMapper } from 'src/common/mapper/submission.mapper';

@Module({
  controllers: [ConstructionController],
  providers: [
    ConstructionService,
    ConstructionMapper,
    BidPackageMapper,
    ConstructionInforMapper,
    SubmissionMapper,
  ],
  imports: [DocumentModule],
  exports: [ConstructionService],
})
export class ConstructionModule {}
