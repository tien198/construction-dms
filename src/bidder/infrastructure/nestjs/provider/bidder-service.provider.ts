import { Inject, Injectable } from '@nestjs/common';
import { BidderService } from 'src/bidder/application/service/bidder.service';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';
import type { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';

@Injectable()
export class BidderServiceProvider extends BidderService {
  constructor(
    @Inject('IBidderWriteRepositoryPort')
    bidderWriteRepository: IBidderWriteRepositoryPort,
    @Inject('IBidderReadRepositoryPort')
    bidderReadRepository: IBidderReadRepositoryPort,
  ) {
    super(bidderWriteRepository, bidderReadRepository);
  }
}
