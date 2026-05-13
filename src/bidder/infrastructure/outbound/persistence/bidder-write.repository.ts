import { Bidder } from 'src/bidder/domain/bidder.entity';
import { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';
import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';

export class BidderWriteRepository implements IBidderWriteRepositoryPort {
  create(bidder: Bidder): Promise<GetBidderQueryResult> {
    throw new Error('Method not implemented.');
  }
  update(bidder: Bidder): Promise<GetBidderQueryResult> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
