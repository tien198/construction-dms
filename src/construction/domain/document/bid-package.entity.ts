import { v7 } from 'uuid';
import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';
import {
  BidderSelectionMethod,
  BidPackageId,
  BidPackageName,
  Duration,
  EstCostStr,
  ProjectOwner,
  ShortDesc,
  SnapshotId,
  SuccessfulBidderId,
} from '../value-objects/bid-package-snapshot.vo';
import type { IBidPackageSnapshot } from './domain-primitive/i-bid-package';

/**
 * BidPackageSnapshot — Child entity within ConstructionInfoSnapshot (part of Decision aggregate).
 */
export class BidPackageSnapshot implements IBidPackageSnapshot {
  constructor(
    public snapshot_id: SnapshotId,
    public bid_package_id: BidPackageId,

    public type: BidPackageType,
    public project_owner: ProjectOwner = new ProjectOwner(
      'Công ty Trực thăng Miền Nam',
    ),
    public name: BidPackageName,
    // short_description
    public short_desc: ShortDesc,

    public est_cost: number,
    public est_cost_str: EstCostStr,

    public bidder_selection_time: Date,
    public bidder_selection_method: BidderSelectionMethod = new BidderSelectionMethod(
      'Chỉ định thầu rút gọn',
    ),

    public duration: Duration,

    public successful_bidder_id: SuccessfulBidderId | null = null,
  ) {
    // generate Id for each new snapshot instance
    this.snapshot_id = SnapshotId.create(v7());
    if (!this.bid_package_id.value) {
      this.bid_package_id = BidPackageId.create(v7());
    }
  }
}
