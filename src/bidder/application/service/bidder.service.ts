import { CreateBidderCommand } from '../command/create-bidder.command';
import { UpdateBidderCommand } from '../command/update-bidder.command';
import { BidderAssembler } from '../assembler/bidder.assembler';
import type { IBidderCrudUseCase } from '../inbound-port/bidder-curd.use-case';
import type { GetBidderQueryResult } from '../query/get-bidder.result';
import type { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';

export class BidderService implements IBidderCrudUseCase {
  constructor(
    private readonly _bidderWriteRepository: IBidderWriteRepositoryPort,
    private readonly _bidderReadRepository: IBidderReadRepositoryPort,
  ) {}
  async create(data: CreateBidderCommand): Promise<GetBidderQueryResult> {
    const bidder = BidderAssembler.fromCmd(data);
    const createdBidder = await this._bidderWriteRepository.create(bidder);
    return BidderAssembler.toQueryResult(createdBidder);
  }

  async update(
    id: string,
    updatedData: UpdateBidderCommand,
  ): Promise<GetBidderQueryResult> {
    const bidder =
      await this._bidderReadRepository.findByIdAndConvertToDomain(id);

    const dirtyFields = bidder.update(updatedData);

    if (dirtyFields.length <= 0) {
      return BidderAssembler.toQueryResult(bidder);
    }

    await this._bidderWriteRepository.update(bidder);

    return BidderAssembler.toQueryResult(bidder);
  }

  async findById(id: string): Promise<GetBidderQueryResult> {
    const bidder = await this._bidderReadRepository.findById(id);
    return bidder;
  }

  async findAll(): Promise<GetBidderQueryResult[]> {
    return await this._bidderReadRepository.findAll();
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
