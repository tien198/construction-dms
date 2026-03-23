import { BidPackageType } from '../enum/bid-package.type';

export interface BidPackageSnapshot {
  id: string;
  construction_infor_snapshot_id: string;

  type: BidPackageType;
  project_owner: string;
  name: string;
  short_description: string;

  est_cost: number;
  est_cost_str: string;

  bidder_selection_time: Date;
  bidder_selection_method: string;

  successful_bidder_id?: string;
  duration: string;
  is_completed: boolean;
}
