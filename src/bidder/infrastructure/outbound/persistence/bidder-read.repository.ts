import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';

export class BidderReadRepository implements IBidderReadRepositoryPort {
  findById(id: string): Promise<GetBidderQueryResult> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<GetBidderQueryResult[]> {
    throw new Error('Method not implemented.');
  }
}
