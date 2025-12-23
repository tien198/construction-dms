import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BidderService } from '../application/bidder.service';
import { CreateBidderDto } from './dto/create-bidder.dto';
import { UpdateBidderDto } from './dto/update-bidder.dto';
import { BidderMapper } from './mapper/bidder.mapper';

@Controller('bidder')
export class BidderController {
  constructor(
    private readonly bidderService: BidderService,
    private readonly bidderMapper: BidderMapper,
  ) {}

  @Post()
  create(@Body() createBidderDto: CreateBidderDto) {
    const bidder = this.bidderMapper.toEntity(createBidderDto);
    return this.bidderService.create(bidder);
  }

  @Get()
  findAll() {
    return this.bidderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidderService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidderDto: UpdateBidderDto) {
    const bidder = this.bidderMapper.toEntity(updateBidderDto);
    return this.bidderService.update(id, bidder);
  }
  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidderService.remove(id);
  }
*/
}
