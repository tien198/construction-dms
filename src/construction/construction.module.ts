import { Module } from '@nestjs/common';
import { ConstructionService } from './construction.service';
import { ConstructionController } from './construction.controller';
import { DocumentModule } from 'src/document/document.module';
import { ConstructionMapper } from 'src/common/mapper/construction..mapper';
import { BidPackageMapper } from 'src/common/mapper/bidPackage.mapper';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService, ConstructionMapper, BidPackageMapper],
  imports: [DocumentModule],
  exports: [ConstructionService],
})
export class ConstructionModule {}
