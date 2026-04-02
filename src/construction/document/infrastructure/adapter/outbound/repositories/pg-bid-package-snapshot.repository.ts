/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PgPoolService } from 'src/shared/infrastructure/database/pg-pool.service';
import { IDocumentRepository } from '../../../../application/port/outbound/document.repository.port';
import { BidPackageSnapshot } from '../../../../domain/entity/bid-package.entity';

@Injectable()
export class PgBidPackageSnapshotRepository implements Pick<
  IDocumentRepository,
  | 'saveBidPackageSnapshot'
  | 'updateBidPackageSnapshot'
  | 'deleteBidPackageSnapshot'
  | 'findBidPackageSnapshotById'
  | 'findAllBidPackageSnapshots'
> {
  private static instance: PgBidPackageSnapshotRepository;
  private constructor(private readonly poolService: PgPoolService) {}

  static getInstance(poolService: PgPoolService) {
    if (!PgBidPackageSnapshotRepository.instance) {
      PgBidPackageSnapshotRepository.instance =
        new PgBidPackageSnapshotRepository(poolService);
    }
    return PgBidPackageSnapshotRepository.instance;
  }

  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
    client?: PoolClient,
  ): Promise<BidPackageSnapshot> {
    throw new Error('Method not implemented.');
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
  ): Promise<BidPackageSnapshot | null> {
    throw new Error('Method not implemented.');
  }
  findAllBidPackageSnapshots(
    client?: PoolClient,
  ): Promise<BidPackageSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
