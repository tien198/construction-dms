import { CreateBidderCommand } from '../command/create-bidder.command';
import { UpdateBidderCommand } from '../command/update-bidder.command';
import { GetBidderQueryResult } from '../query/get-bidder.result';

export interface IBidderCrudUseCase {
  create(data: CreateBidderCommand): Promise<GetBidderQueryResult>;
  update(id: string, data: UpdateBidderCommand): Promise<GetBidderQueryResult>;
  findAll(): Promise<GetBidderQueryResult[]>;
  findById(id: string): Promise<GetBidderQueryResult>;
  delete(id: string): Promise<void>;
}
