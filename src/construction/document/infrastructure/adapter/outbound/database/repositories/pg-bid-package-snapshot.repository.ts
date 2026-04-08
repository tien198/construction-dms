/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgConnectionService } from 'src/shared/infrastructure/database/psql/pg-connection.service';
import { IBidPackageSnapshotRepository } from '../../../../../application/port/outbound/database/document.repository.port';
import { BidPackageSnapshot } from '../../../../../domain/bid-package.entity';

@Injectable()
export class PgBidPackageSnapshotRepository implements IBidPackageSnapshotRepository {
  private static _instance: PgBidPackageSnapshotRepository;
  private constructor(private readonly _poolService: PgConnectionService) {}

  static getInstance(poolService: PgConnectionService) {
    if (!PgBidPackageSnapshotRepository._instance) {
      PgBidPackageSnapshotRepository._instance =
        new PgBidPackageSnapshotRepository(poolService);
    }
    return PgBidPackageSnapshotRepository._instance;
  }

  async saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    const result = await this._poolService.pool.query(
      `INSERT INTO bid_package_snapshots (id, construction_infor_snapshot_id, type, project_owner, name, short_desc, est_cost, est_cost_str, bidder_selection_time, bidder_selection_method, duration, is_completed, successful_bidder_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        bidPackageSnapshot.id.value,
        bidPackageSnapshot.construction_infor_snapshot_id.value,
        bidPackageSnapshot.type,
        bidPackageSnapshot.project_owner.value,
        bidPackageSnapshot.name.value,
        bidPackageSnapshot.short_desc.value,
        bidPackageSnapshot.est_cost,
        bidPackageSnapshot.est_cost_str.value,
        bidPackageSnapshot.bidder_selection_time,
        bidPackageSnapshot.bidder_selection_method.value,
        bidPackageSnapshot.duration.value,
        bidPackageSnapshot.is_completed,
        bidPackageSnapshot.successful_bidder_id?.value ?? null,
      ],
    );
    return result.rows[0] as BidPackageSnapshot;
  }
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteBidPackageSnapshot(id: string, client?: PoolClient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findBidPackageSnapshotById(
    id: string,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    throw new Error('Method not implemented.');
  }
  findAllBidPackageSnapshots(
    client?: PoolClient,
  ): Promise<BidPackageSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
