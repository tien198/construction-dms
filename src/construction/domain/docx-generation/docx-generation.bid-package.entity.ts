import { BidPackageResDto } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { BidPackageType } from '../enum/bid-package.enum';

export class DocxGenerationBidPackage implements Omit<
  BidPackageResDto,
  'est_cost'
> {
  id: string;
  type: BidPackageType;
  project_owner: string;
  name: string;
  short_desc: string;
  bidder_selection_time: string;
  bidder_selection_method: string;
  // Note: sau khi hoàn thành chức năng nhà thầu sẽ thêm
  successful_bidder_id: string;
  duration: string;
  is_completed: boolean;
  // est - estimated
  est_cost: string;
  est_cost_str: string;
}
