import { Inject, Injectable } from '@nestjs/common';
import { IBidderCrudUseCase } from 'src/bidder/application/inbound-port/bidder-curd.use-case';
import { BidderService } from 'src/bidder/application/service/bidder.service';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';
import type { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';

@Injectable()
export class BidderServiceProvider implements IBidderCrudUseCase {
  private readonly _bidderService: BidderService;
  constructor(
    @Inject('IBidderWriteRepositoryPort')
    private readonly _bidderWriteRepository: IBidderWriteRepositoryPort,
    @Inject('IBidderReadRepositoryPort')
    private readonly _bidderReadRepository: IBidderReadRepositoryPort,
  ) {
    this._bidderService = new BidderService(
      this._bidderWriteRepository,
      this._bidderReadRepository,
    );
  }

  create(data) {
    return this._bidderService.create(data);
  }
  update(id, data) {
    return this._bidderService.update(id, data);
  }
  findById(id) {
    return this._bidderService.findById(id);
  }
  findAll() {
    return this._bidderService.findAll();
  }
  delete(id: string) {
    return this._bidderService.delete(id);
  }
}
