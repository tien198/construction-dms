import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';
import {
  SnapshotId,
  BidPackageId,
  BidPackageName,
  Duration,
  EstCostStr,
  ProjectOwner,
  ShortDesc,
  BidderSelectionMethod,
  SuccessfulBidderId,
} from '../../value-objects/bid-package-snapshot.vo';

export interface IBidPackageSnapshot {
  snapshot_id: SnapshotId;
  bid_package_id: BidPackageId;

  type: BidPackageType;
  project_owner: ProjectOwner;
  name: BidPackageName;
  // short_description
  short_desc: ShortDesc;

  est_cost: number;
  est_cost_str: EstCostStr;

  bidder_selection_time: Date;
  bidder_selection_method: BidderSelectionMethod;

  duration: Duration;

  successful_bidder_id: SuccessfulBidderId | null;
}
