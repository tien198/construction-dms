import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';
import { ConstructionInfoId } from '../value-objects/construction-info.vo';
import {
  BidderSelectionMethod,
  BidPackageId,
  BidPackageName,
  Duration,
  EstCostStr,
  ProjectOwner,
  ShortDesc,
  SuccessfulBidderId,
} from '../value-objects/bid-package-snapshot.vo';

export interface IBidPackageSnapshot {
  id: BidPackageId;
  construction_info_snapshot_id: ConstructionInfoId;

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
  is_completed: boolean;

  successful_bidder_id: SuccessfulBidderId | null;
}
