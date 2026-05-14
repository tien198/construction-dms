import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';
import { Bidder } from '../bidder.entity';

export interface IBidderReadRepositoryPort {
  findById(id: string): Promise<GetBidderQueryResult>;
  findByIdAndConvertToDomain(id: string): Promise<Bidder>;
  findAll(): Promise<GetBidderQueryResult[]>;
}
