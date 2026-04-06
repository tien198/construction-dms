/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IConstructionRepository } from '../../../../application/port/outbound/document.repository.port';
import { Construction } from '../../../../domain/entity/construction.entity';

@Injectable()
export class PgConstructionRepository implements IConstructionRepository {
  private static _instance: PgConstructionRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgConstructionRepository._instance) {
      PgConstructionRepository._instance = new PgConstructionRepository(
        poolService,
      );
    }
    return PgConstructionRepository._instance;
  }

  async saveConstruction(
    construction: Construction,
    client?: PoolClient,
  ): Promise<Construction> {
    const result = await this._poolService.pool.query(
      `INSERT INTO constructions (id, pursuant_to_dec_tct_id, current_snapshot_id) VALUES ($1, $2, $3) RETURNING *`,
      [
        construction.id.value,
        construction.pursuant_to_dec_tct_id.dec_id,
        construction.current_snapshot_id?.value,
      ],
    );
    return result.rows[0] as Construction;
  }
  updateConstruction(
    id: string,
    construction: Partial<Construction>,
    client?: PoolClient,
  ): Promise<Construction> {
    throw new Error('Method not implemented.');
  }
  deleteConstruction(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionById(
    id: string,
    client?: PoolClient,
  ): Promise<Construction | null> {
    throw new Error('Method not implemented.');
  }
  findAllConstructions(client?: PoolClient): Promise<Construction[]> {
    throw new Error('Method not implemented.');
  }
}
