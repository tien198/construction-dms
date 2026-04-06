/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IConstructionInfoSnapshotRepository } from '../../../../application/port/outbound/document.repository.port';
import { ConstructionInfoSnapshot } from '../../../../domain/entity/construction-infor.entity';

@Injectable()
export class PgConstructionInfoSnapshotRepository implements IConstructionInfoSnapshotRepository {
  private static _instance: PgConstructionInfoSnapshotRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgConstructionInfoSnapshotRepository._instance) {
      PgConstructionInfoSnapshotRepository._instance =
        new PgConstructionInfoSnapshotRepository(poolService);
    }
    return PgConstructionInfoSnapshotRepository._instance;
  }

  async saveConstructionInfoSnapshot(
    constructionInfoSnapshot: ConstructionInfoSnapshot,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot> {
    const result = await this._poolService.pool.query(
      `INSERT INTO construction_info_snapshots (id, construction_id, name, source_of_funds, est_cost, est_cost_str, impl_start_date, impl_end_date, existing_condition_of_the_structure, repair_scope ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        constructionInfoSnapshot.id.value,
        constructionInfoSnapshot.construction_id.value,
        constructionInfoSnapshot.name.value,
        constructionInfoSnapshot.source_of_funds.value,
        constructionInfoSnapshot.est_cost,
        constructionInfoSnapshot.est_cost_str.value,
        constructionInfoSnapshot.impl_start_date,
        constructionInfoSnapshot.impl_end_date,
        constructionInfoSnapshot.existing_condition_of_the_structure.value,
        constructionInfoSnapshot.repair_scope.value,
      ],
    );
    return result.rows[0] as ConstructionInfoSnapshot;
  }
  updateConstructionInfoSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInfoSnapshot>,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteConstructionInfoSnapshot(
    id: string,
    client?: PoolClient,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionInfoSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot> {
    throw new Error('Method not implemented.');
  }
  findAllConstructionInfoSnapshots(
    client?: PoolClient,
  ): Promise<ConstructionInfoSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
