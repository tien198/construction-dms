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
} from '../../value-objects/bid-package-snapshot.vo';

export interface IBidPackageSnapshot {
  id: BidPackageId;

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
