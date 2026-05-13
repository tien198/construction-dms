import { CreateBidderCommand } from '../command/create-bidder.command';
import { UpdateBidderCommand } from '../command/update-bidder.command';
import type { IBidderCrudUseCase } from '../inbound-port/bidder-curd.use-case';
import type { GetBidderQueryResult } from '../query/get-bidder.result';
import type { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';
import { BidderAssembler } from '../assembler/bidder.assembler';

export class BidderService implements IBidderCrudUseCase {
  constructor(
    private readonly _bidderWriteRepository: IBidderWriteRepositoryPort,
    private readonly _bidderReadRepository: IBidderReadRepositoryPort,
  ) {}
  create(data: CreateBidderCommand): Promise<GetBidderQueryResult> {
    const bidder = BidderAssembler.fromCmd(data);
    return this._bidderWriteRepository.create(bidder);
  }

  /**
   *
   */
  update(id: string, data: UpdateBidderCommand): Promise<GetBidderQueryResult> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<GetBidderQueryResult> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<GetBidderQueryResult[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
