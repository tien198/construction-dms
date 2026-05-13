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

@Controller('bidder')
export class BidderController {
  constructor(
    @Inject('IBidderCrudUseCase')
    private readonly _bidderService: IBidderCrudUseCase,
  ) {}

  @Post()
  create(@Body() data: CreateBidderDto): Promise<GetBidderQueryResult> {
    return this._bidderService.create(data);
  }

  @Get()
  findAll(): Promise<GetBidderQueryResult[]> {
    return this._bidderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<GetBidderQueryResult> {
    return this._bidderService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateBidderDto,
  ): Promise<GetBidderQueryResult> {
    return this._bidderService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._bidderService.delete(id);
  }
}
