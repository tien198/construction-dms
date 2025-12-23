import { Injectable } from '@nestjs/common';
import { BidderRespo } from '../infrastructure/bidder.respo';
import { Bidder } from '../domain/type/bidder.type';

@Injectable()
export class BidderService {
  constructor(private readonly bidderRespo: BidderRespo) {}

  create(bidder: Bidder): Promise<Bidder> {
    return this.bidderRespo.create(bidder);
  }

  findAll(): Promise<Bidder[]> {
    return this.bidderRespo.find();
  }

  async findById(id: string): Promise<Bidder> {
    const finded = await this.bidderRespo.findById(id);
    if (!finded) {
      throw new Error(`Not found bidder (with id: ${id})`);
    }
    return finded;
  }

  async update(id: string, bidder: Bidder): Promise<Bidder> {
    return await this.bidderRespo.updateById(id, bidder);
  }

  /*
  remove(id: string): Promise<Bidder> {
    return `This action removes a #${id} bidder`;
  }
  */
}
