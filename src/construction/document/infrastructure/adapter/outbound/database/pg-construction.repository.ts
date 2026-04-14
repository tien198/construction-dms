import { Injectable } from '@nestjs/common';
import type { Pool } from 'pg';

import fs from 'fs';
import path from 'path';

import { ConstructionResDto } from 'src/construction/document/application/dto/response/get-constructions.res-dto';
import { IConstructionRepository } from 'src/construction/document/application/port/outbound/database/construction.repository.port';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';

@Injectable()
export class PgConstructionRepository implements IConstructionRepository {
  private readonly _poolClient: Pool;
  constructor(connectionService: PgConnectionService) {
    this._poolClient = connectionService.pool;
  }

  async findConstructionsList(): Promise<ConstructionResDto[]> {
    const query = this._getQueryFromFile('find-constructions-list.sql');
    const result = await this._poolClient.query(query);
    return result.rows;
  }

  private _getQueryFromFile(fileName: string): string {
    return fs.readFileSync(
      path.join(
        __dirname,
        '_construction.repositories',
        'construction.query',
        fileName,
      ),
      'utf-8',
    );
  }
}
