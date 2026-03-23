import { ConstructionPeriod } from 'src/construction/domain/enum/construction-period.type';

export interface BidPackageSnapshot {
  id: string;
  type: ConstructionPeriod;
  project_owner: string;
  bid_package_name: string;
  short_description: string;
  budget: number;
  budget_str: string;
  bidder_selection_time: string;
  bidder_selection_method: string;
  // Note: sau khi hoàn thành chức năng nhà thầu sẽ thêm
  successful_bidder_id: string | null;
  duration: string;
  is_completed: boolean;
  // est - estimated
  est_cost: number;
  est_cost_str: string;
}
