/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IConstructionInforSnapshotRepository } from '../../../../../application/port/outbound/database/document.repository.port';
import { ConstructionInforSnapshot } from '../../../../../domain/construction-infor.entity';

@Injectable()
export class PgConstructionInforSnapshotRepository implements IConstructionInforSnapshotRepository {
  private static _instance: PgConstructionInforSnapshotRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgConstructionInforSnapshotRepository._instance) {
      PgConstructionInforSnapshotRepository._instance =
        new PgConstructionInforSnapshotRepository(poolService);
    }
    return PgConstructionInforSnapshotRepository._instance;
  }

  async saveConstructionInforSnapshot(
    constructionInfoSnapshot: ConstructionInforSnapshot,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    const result = await (client || this._poolService.pool).query(
      `INSERT INTO construction_infor_snapshots (id, construction_id, name, source_of_funds, est_cost, est_cost_str, impl_start_date, impl_end_date, existing_condition_of_the_structure, repair_scope ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
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
    return result.rows[0] as ConstructionInforSnapshot;
  }
  updateConstructionInforSnapshot(
    id: string,
    constructionInfoSnapshot: Partial<ConstructionInforSnapshot>,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteConstructionInforSnapshot(
    id: string,
    client?: PoolClient,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findConstructionInforSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot> {
    throw new Error('Method not implemented.');
  }
  findAllConstructionInforSnapshots(
    client?: PoolClient,
  ): Promise<ConstructionInforSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
