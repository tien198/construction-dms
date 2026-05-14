import fs from 'fs';
import path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { GetBidderQueryResult } from 'src/bidder/application/query/get-bidder.result';
import { Bidder } from 'src/bidder/domain/bidder.entity';
import type { IBidderReadRepositoryPort } from 'src/bidder/domain/outbound-port/bidder-read.repository.port';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { BidderRow } from './model/bidder.row';
import { BidderMapper } from './mapper/bidder.mapper';

@Injectable()
export class BidderReadRepository implements IBidderReadRepositoryPort {
  private readonly _poolClient: Pool;

  constructor(connectionService: PgConnectionService) {
    this._poolClient = connectionService.pool;
  }

  async findById(id: string): Promise<GetBidderQueryResult> {
    const rows = await this._poolClient.query(
      this._getQueryFromFile('find-bidder-by-id.sql'),
      [id],
    );
    const finded = rows[0] as BidderRow;

    if (!finded)
      throw new NotFoundException(`Bidder with ID: "${id}" not found`);

    return finded;
  }

  async findByIdAndConvertToDomain(id: string): Promise<Bidder> {
    const result = await this.findById(id);
    return BidderMapper.fromPersistence(result);
  }

  async findAll(): Promise<GetBidderQueryResult[]> {
    const rows = await this._poolClient.query(
      this._getQueryFromFile('find-bidders-list.sql'),
    );
    return rows as unknown as BidderRow[];
  }

  private _getQueryFromFile(...pathName: string[]): string {
    return fs.readFileSync(
      path.join(__dirname, 'sql', 'dql', ...pathName),
      'utf-8',
    );
  }
}
