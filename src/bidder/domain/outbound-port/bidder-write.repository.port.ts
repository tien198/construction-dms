import { Bidder } from '../bidder.entity';

export interface IBidderWriteRepositoryPort {
  create(bidder: Bidder): Promise<Bidder>;
  update(bidder: Bidder): Promise<Bidder>;
  delete(id: string): Promise<void>;
}
