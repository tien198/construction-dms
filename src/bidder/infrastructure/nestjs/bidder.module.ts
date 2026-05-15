import { Module } from '@nestjs/common';
import { BidderController } from '../inbound/bidder/bidder.controller';
import { BidderWriteRepository } from '../outbound/persistence/bidder-write.repository';
import { BidderReadRepository } from '../outbound/persistence/bidder-read.repository';
import { GetBidderByIdHandlerProvider } from './provider/get-bidder-by-id.provider';
import { BidderServiceProvider } from './provider/bidder-service.provider';

@Module({
  controllers: [BidderController],
  providers: [
    {
      provide: 'IBidderCrudUseCase',
      useClass: BidderServiceProvider,
    },
    {
      provide: 'IBidderWriteRepositoryPort',
      useClass: BidderWriteRepository,
    },
    {
      provide: 'IBidderReadRepositoryPort',
      useClass: BidderReadRepository,
    },
    GetBidderByIdHandlerProvider,
  ],
  exports: ['IBidderCrudUseCase'],
})
export class BidderModule {}
