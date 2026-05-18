import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IBidderCrudUseCase } from 'src/bidder/application/inbound-port/bidder-curd.use-case';
import type { CreateBidderDto } from './dto/create-bidder.dto';
import type { UpdateBidderDto } from './dto/update-bidder.dto';
import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';
import { GetBidderByIdHandlerProvider } from '../../nestjs/provider/get-bidder-by-id.provider';
import { ResResult } from 'src/shared/response-result';

@Controller('bidder')
export class BidderController {
  constructor(
    @Inject('IBidderCrudUseCase')
    private readonly _bidderService: IBidderCrudUseCase,
    private readonly _getBidderByIdUseCase: GetBidderByIdHandlerProvider,
  ) {}

  @Post()
  async create(
    @Body() data: CreateBidderDto,
  ): Promise<ResResult<GetBidderQueryResult>> {
    const created = await this._bidderService.create(data);
    return new ResResult(created);
  }

  @Get()
  async findAll(): Promise<ResResult<GetBidderQueryResult[]>> {
    const bidders = await this._bidderService.findAll();
    return new ResResult(bidders);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<ResResult<GetBidderQueryResult>> {
    const bidder = await this._getBidderByIdUseCase.execute({ id });
    return new ResResult(bidder);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBidderDto,
  ): Promise<ResResult<GetBidderQueryResult>> {
    const updated = await this._bidderService.update(id, data);
    return new ResResult(updated);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._bidderService.delete(id);
  }
}
