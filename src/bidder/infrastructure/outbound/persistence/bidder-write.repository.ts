import fs from 'fs';
import path from 'path';

import { Bidder } from 'src/bidder/domain/bidder.entity';
import { IBidderWriteRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-write.repository.port';
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { BidderMapper } from './mapper/bidder.mapper';

@Injectable()
export class BidderWriteRepository implements IBidderWriteRepositoryPort {
  private readonly _poolClient: Pool;

  constructor(connectionService: PgConnectionService) {
    this._poolClient = connectionService.pool;
  }

  async create(bidder: Bidder): Promise<Bidder> {
    const bidderRow = BidderMapper.toPersistence(bidder);
    const saveBidderSql = this._getManipulateFromFile('save-bidder.sql');
    await this._poolClient.query(saveBidderSql, [
      bidderRow.name,
      bidderRow.address,
      bidderRow.representative_name,
      bidderRow.representative_position,
      bidderRow.bank_account_number,
      bidderRow.tax_id,
      bidderRow.phone_number,
      bidderRow.email,
      bidderRow.id,
    ]);
    return bidder;
  }

  async update(bidder: Bidder): Promise<Bidder> {
    const bidderRow = BidderMapper.toPersistence(bidder);
    const updateBidderSql = this._getManipulateFromFile('update-bidder.sql');
    await this._poolClient.query(updateBidderSql, [
      bidderRow.name,
      bidderRow.address,
      bidderRow.representative_name,
      bidderRow.representative_position,
      bidderRow.bank_account_number,
      bidderRow.tax_id,
      bidderRow.phone_number,
      bidderRow.email,
      bidderRow.id,
    ]);
    return bidder;
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * @description helper function to get manipulate sql from file
   */
  protected _getManipulateFromFile(...pathNames: string[]) {
    return fs.readFileSync(
      path.join(__dirname, 'sql', 'dml', ...pathNames),
      'utf-8',
    );
  }
}
