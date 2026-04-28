import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';

export interface IBidPackageSnapshotCommand {
  id?: string;

  type: BidPackageType;

  project_owner: string;

  name: string;

  // short_description
  short_desc: string;

  bidder_selection_time: Date;

  bidder_selection_method: string;

  successful_bidder_id?: string | null;

  duration: string;

  is_completed: boolean;

  est_cost: number;

  est_cost_str: string;
}
