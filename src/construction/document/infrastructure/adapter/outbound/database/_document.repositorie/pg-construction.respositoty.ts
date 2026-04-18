/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/persistence/psql/pg-connection.service';
import { IConstructionRepository } from '../../../../../application/port/outbound/database/document.repository.port';
import { Construction } from '../../../../../domain/construction.entity';
import { ConstructionId } from 'src/construction/document/domain/value-objects/construction.vo';
import {
  DecisionId,
  PursuantToDecTCT,
} from 'src/construction/document/domain/value-objects/document.vo';
import { ConstructionInfoId } from 'src/construction/document/domain/value-objects/construction-info.vo';

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
    const result = await (client || this._poolService.pool).query(
      `INSERT INTO constructions (id, pursuant_to_dec_tct_id, current_snapshot_id) VALUES ($1, $2, $3) RETURNING *`,
      [
        construction.id.value,
        construction.pursuant_to_dec_tct_id.dec_id,
        construction.current_snapshot_id?.value,
      ],
    );
    return this.toDomain(result.rows[0]);
  }
  async updateConstruction(
    id: string,
    construction: Partial<Construction>,
    client?: PoolClient,
  ): Promise<Construction> {
    const setClauses: string[] = [];
    const values: unknown[] = [id]; // $1 is always the id

    for (const [k, val] of Object.entries(construction)) {
      values.push(val);
      setClauses.push(`${k} = $${values.length}`);
    }

    if (setClauses.length === 0) {
      throw new Error('No fields to update');
    }

    const result = await (client || this._poolService.pool).query(
      `UPDATE constructions SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`,
      values,
    );

    return this.toDomain(result.rows[0]);
  }

  deleteConstruction(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findConstructionById(
    id: string,
    client?: PoolClient,
  ): Promise<Construction> {
    const result = await (client || this._poolService.pool).query(
      `SELECT * FROM constructions WHERE id = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      throw new Error(`Not found construction with id: "${id}"`);
    }
    return this.toDomain(result.rows[0]);
  }

  findAllConstructions(client?: PoolClient): Promise<Construction[]> {
    throw new Error('Method not implemented.');
  }

  private toDomain(row: Record<string, any>): Construction {
    return new Construction(
      new ConstructionId(row.id),
      new PursuantToDecTCT(row.pursuant_to_dec_tct_id),
      row.current_snapshot_id
        ? new ConstructionInfoId(row.current_snapshot_id)
        : null,
    );
  }
}
