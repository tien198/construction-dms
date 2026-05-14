import { Inject, Injectable } from '@nestjs/common';
import { GetBidderByIdHandler } from 'src/bidder/application/query/get-bidder-by-id';
import { BidderReadRepository } from '../../outbound/persistence/bidder-read.repository';

@Injectable()
export class GetBidderByIdHandlerProvider extends GetBidderByIdHandler {
  constructor(
    @Inject('IBidderReadRepositoryPort')
    bidderReadRepository: BidderReadRepository,
  ) {
    super(bidderReadRepository);
  }
}
