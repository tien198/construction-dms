import { Module } from '@nestjs/common';
import { BidderService } from './application/bidder.service';
import { BidderController } from './presentation/bidder.controller';
import { BidderRespo } from './infrastructure/bidder.respo';
import { BidderMapperModule } from './module/mapper.module';

@Module({
  controllers: [BidderController],
  providers: [BidderService, BidderRespo],
  imports: [BidderMapperModule],
})
export class BidderModule {}
