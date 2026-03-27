/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
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
  saveBidPackageSnapshot(
    bidPackageSnapshot: BidPackageSnapshot,
  ): Promise<BidPackageSnapshot> {
    throw new Error('Method not implemented.');
  }
  updateBidPackageSnapshot(
    id: string,
    bidPackageSnapshot: Partial<BidPackageSnapshot>,
  ): Promise<BidPackageSnapshot> {
    throw new Error('Method not implemented.');
  }
  deleteBidPackageSnapshot(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findBidPackageSnapshotById(id: string): Promise<BidPackageSnapshot | null> {
    throw new Error('Method not implemented.');
  }
  findAllBidPackageSnapshots(): Promise<BidPackageSnapshot[]> {
    throw new Error('Method not implemented.');
  }
}
