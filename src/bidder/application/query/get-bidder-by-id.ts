import { GetBidderQueryResult } from './get-bidder.result';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';

export class GetBidderByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetBidderByIdQueryResult extends GetBidderQueryResult {}

export class GetBidderByIdHandler {
  constructor(
    private readonly _bidderReadRepository: IBidderReadRepositoryPort,
  ) {}

  async execute(query: GetBidderByIdQuery): Promise<GetBidderByIdQueryResult> {
    return await this._bidderReadRepository.findById(query.id);
  }
}
