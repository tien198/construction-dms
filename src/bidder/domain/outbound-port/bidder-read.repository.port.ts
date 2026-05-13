import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';

export interface IBidderReadRepositoryPort {
  findById(id: string): Promise<GetBidderQueryResult | null>;
  findAll(): Promise<GetBidderQueryResult[]>;
}
