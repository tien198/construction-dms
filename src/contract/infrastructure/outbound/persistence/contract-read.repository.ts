import { Injectable } from '@nestjs/common';
import { GetContractQueryResult } from 'src/contract/application/query/get-contract.result';
import { IContractReadRepository } from 'src/contract/domain/outbound-port/contract-read.repository.port';
import { BaseRepository } from './base-repository';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { Pool } from 'pg';
import { Contract } from 'src/contract/domain/contract.entity';
import { ContractMapper } from './mapper/contract.mapper';
import { ContractRow } from './model/contract.row';

@Injectable()
export class ContractReadRepository
  extends BaseRepository
  implements IContractReadRepository
{
  private readonly _pool: Pool;
  constructor(pgConnectionService: PgConnectionService) {
    super();
    this._pool = pgConnectionService.pool;
  }
  async findAll(): Promise<GetContractQueryResult[]> {
    const sql = this._getDqlFromFile('find-contract-list.sql');
    const result = await this._pool.query(sql);
    return result.rows as ContractRow[];
  }

  async findById(id: string): Promise<GetContractQueryResult> {
    const sql = this._getDqlFromFile('find-contract-by-id.sql');
    const result = await this._pool.query(sql, [id]);
    return result.rows[0] as ContractRow;
  }

  async findByIdAndConvertToDomain(id: string): Promise<Contract> {
    const row = await this.findById(id);
    return ContractMapper.fromPersistence(row);
  }
}
