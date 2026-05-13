import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';
import { Bidder } from '../bidder.entity';

export interface IBidderWriteRepositoryPort {
  create(bidder: Bidder): Promise<GetBidderQueryResult>;
  update(bidder: Bidder): Promise<GetBidderQueryResult>;
  delete(id: string): Promise<void>;
}
