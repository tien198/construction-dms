import { Module } from '@nestjs/common';
import { BidderController } from '../inbound/bidder/bidder.controller';
import { BidderService } from '../../application/service/bidder.service';
import { BidderWriteRepository } from '../outbound/persistence/bidder-write.repository';
import { BidderReadRepository } from '../outbound/persistence/bidder-read.repository';

@Module({
  controllers: [BidderController],
  providers: [
    {
      provide: 'IBidderCrudUseCase',
      useClass: BidderService,
    },
    {
      provide: 'IBidderWriteRepositoryPort',
      useClass: BidderWriteRepository,
    },
    {
      provide: 'IBidderReadRepositoryPort',
      useClass: BidderReadRepository,
    },
  ],
  exports: ['IBidderCrudUseCase'],
})
export class BidderModule {}
