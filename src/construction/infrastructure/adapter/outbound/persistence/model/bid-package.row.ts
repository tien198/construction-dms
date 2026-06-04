import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';

export class BidPackageRow {
  id: string;

  construction_id: string;

  type: BidPackageType;
}

export class BidPackageSnapshotRow {
  id: string;
  bid_package_id: string;
  submission_id: string;

  project_owner: string;
  name: string;
  short_desc: string;

  est_cost: number;
  est_cost_str: string;

  bidder_selection_time: Date;
  bidder_selection_method: string;

  successful_bidder_id: string | null;
  duration: string;
  is_completed: boolean;

  created_at: Date = new Date(Date.now());
}
