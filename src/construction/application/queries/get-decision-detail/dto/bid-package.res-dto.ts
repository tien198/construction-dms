import { BidPackageType } from 'src/construction/domain/enum/bid-package.enum';

export class BidPackageResDto {
  id: string;
  type: BidPackageType;
  project_owner: string;
  name: string;
  short_desc: string;
  bidder_selection_time: string;
  bidder_selection_method: string;
  // Note: sau khi hoàn thành chức năng nhà thầu sẽ thêm
  successful_bidder_id: string | null;
  duration: string;
  is_completed: boolean;
  // est - estimated
  est_cost: number;
  est_cost_str: string;

  contract_no?: string;
  contract_signing_date?: string;
  approval_no?: string;
  approval_date?: string;
}
