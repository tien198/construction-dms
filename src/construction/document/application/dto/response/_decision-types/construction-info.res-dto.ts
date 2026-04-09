import type { BidPackageResDto } from './bid-package.res-dto';

export class ConstructionInfoResDto {
  id: string;
  name: string;
  source_of_funds: string;
  // impl - implementation
  impl_start_date: string;
  impl_end_date: string;
  existing_condition_of_the_structure: string;
  repair_scope: string;
  // est - estimated
  est_cost: number;
  est_cost_str: string;
  bid_package_snapshots?: BidPackageResDto[];
}
