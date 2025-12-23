import { Module } from '@nestjs/common';
import { BidderMapper } from '../presentation/mapper/bidder.mapper';

@Module({
  providers: [BidderMapper],
  exports: [BidderMapper],
})
export class BidderMapperModule {}
