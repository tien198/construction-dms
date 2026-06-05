import { BidPackageResDto } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { BidPackageType } from '../enum/bid-package.enum';

export class DocxGenerationBidPackage implements Omit<
  BidPackageResDto,
  'successful_bidder_id' | 'est_cost'
> {
  id: string;
  type: BidPackageType;
  project_owner: string;
  name: string;
  short_desc: string;
  bidder_selection_time: string;
  bidder_selection_method: string;
  // Note: sau khi hoàn thành chức năng nhà thầu sẽ thêm
  successful_bidder: BidderInfor;
  duration: string;
  is_completed: boolean;
  // est - estimated
  est_cost: string;
  est_cost_str: string;

  contract_no?: string;
  contract_signing_date?: string;
  approval_no?: string;
  approval_date?: string;
}

type BidderInfor = {
  name: string;
  address: string;
  representative_name: string;
  representative_position: string;
  bank_account_number: string;
  tax_id: string;
  phone_number: string;
  email: string;
};
