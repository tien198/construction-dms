import { Injectable } from '@nestjs/common';
import { Contract } from 'src/contract/domain/contract.entity';
import { IContractWriteRepository } from 'src/contract/domain/outbound-port/contract-write.repository.port';
import { BaseRepository } from './base-repository';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { Pool } from 'pg';

@Injectable()
export class ContractWriteRepository
  extends BaseRepository
  implements IContractWriteRepository
{
  private readonly _pool: Pool;
  constructor(pgConnectionService: PgConnectionService) {
    super();
    this._pool = pgConnectionService.pool;
  }

  async save(data: Contract): Promise<Contract> {
    const sql = this._getDmlFromFile('save-contract.sql');
    await this._pool.query(sql, [
      data.id!.value,
      data.bidPackageId.value,
      data.no.value,
      data.signingDate.value,
    ]);
    return data;
  }

  async update(id: string, data: Contract): Promise<Contract> {
    const sql = this._getDmlFromFile('update-contract.sql');
    await this._pool.query(sql, [
      data.bidPackageId.value,
      data.no.value,
      data.signingDate.value,
      id,
    ]);
    return data;
  }

  async delete(id: string): Promise<void> {
    const sql = this._getDmlFromFile('delete-contract.sql');
    await this._pool.query(sql, [id]);
  }
}
