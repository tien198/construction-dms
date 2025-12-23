import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DB } from 'src/common/infrastructure/db';
import { Bidder } from '../domain/type/bidder.type';
import { Collection } from 'src/common/infrastructure/collection';

@Injectable()
export class BidderRespo {
  constructor(
    private readonly db: DB,
    private readonly configService: ConfigService,
  ) {
    const dataFile = this.configService.get<string>('BIDDERS_DATA_FILE') ?? '';
    this.col = this.db.collection<Bidder>(dataFile);
  }

  col: Collection<Bidder>;

  create(bidder: Bidder): Promise<Bidder> {
    return this.col.insertOne(bidder);
  }

  updateById(id: string, bidder: Bidder): Promise<Bidder> {
    if (!id) {
      throw new Error('updated is missing "id" field');
    }
    return this.col.updateOne({ id }, bidder);
  }

  find(filter?: Partial<Bidder>): Promise<Bidder[]> {
    return this.col.find(filter);
  }

  findOne(filter: Partial<Bidder>): Promise<Bidder | null> {
    return this.col.findOne(filter);
  }

  findById(id: string): Promise<Bidder | null> {
    return this.col.findOne({ id });
  }
}
