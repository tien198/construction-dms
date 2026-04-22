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
  SuccessfulBidderId,
} from './value-objects/bid-package-snapshot.vo';
import type { IBidPackageSnapshot } from './domain-primitive/i-bid-package';

/**
 * BidPackageSnapshot — Child entity within ConstructionInfoSnapshot (part of Decision aggregate).
 */
export class BidPackageSnapshot implements IBidPackageSnapshot {
  constructor(
    public id: BidPackageId,

    public type: BidPackageType,
    public project_owner: ProjectOwner,
    public name: BidPackageName,
    // short_description
    public short_desc: ShortDesc,

    public est_cost: number,
    public est_cost_str: EstCostStr,

    public bidder_selection_time: Date,
    public bidder_selection_method: BidderSelectionMethod,

    public duration: Duration,
    public is_completed: boolean,

    public successful_bidder_id: SuccessfulBidderId | null = null,
  ) {
    if (id.value === null) {
      this.id = BidPackageId.create(v7());
    }
  }

  // Reconstitute từ DB — dùng trong repository khi load lên
}
