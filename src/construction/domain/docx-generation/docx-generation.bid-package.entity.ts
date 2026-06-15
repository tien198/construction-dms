import { BidPackageSnapshotResDto } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { BidPackageType } from '../enum/bid-package.enum';
import { DocxFormater } from './docx-formater';
import { DocxGenerationBidder } from './docx-generation-bidder.entity';

export class DocxGenerationBidPackage
  extends DocxFormater
  implements
    Partial<
      Omit<
        BidPackageSnapshotResDto,
        'successful_bidder_id' | 'est_cost' | 'successful_bidder'
      >
    >
{
  id: string;
  bid_package_id: string;
  type: BidPackageType;
  project_owner: string;
  name: string;
  short_desc: string;
  // est - estimated
  est_cost: string;
  est_cost_str: string;
  //
  bidder_selection_time: string;
  bidder_selection_method: string;
  // Note: sau khi hoàn thành chức năng nhà thầu sẽ thêm
  // succ_bidder = successful_bidder
  succ_bidder?: DocxGenerationBidder = undefined;
  duration: string;
  is_completed: boolean;

  contract_no: string;
  approval_no: string;

  constructor(bidPackage: BidPackageSnapshotResDto) {
    super();
    this.id = bidPackage.id;
    this.bid_package_id = bidPackage.bid_package_id;
    this.type = bidPackage.type;
    this.project_owner = bidPackage.project_owner;
    this.name = bidPackage.name;
    this.short_desc = bidPackage.short_desc;
    this.est_cost = this.formatCurrency(bidPackage.est_cost);
    this.est_cost_str = bidPackage.est_cost_str;
    this.bidder_selection_time = this.formatDate(
      bidPackage.bidder_selection_time,
      'month',
    );
    this.bidder_selection_method = bidPackage.bidder_selection_method;
    if (bidPackage.successful_bidder) {
      this.succ_bidder = new DocxGenerationBidder(bidPackage.successful_bidder);
    }
    this.duration = bidPackage.duration;
    this.is_completed = bidPackage.is_completed;

    this.contract_no = `${bidPackage.contract_no} ngày ${this.formatDate(bidPackage.contract_signing_date ?? null)}`;
    this.approval_no = `${bidPackage.approval_no} ngày ${this.formatDate(bidPackage.approval_date ?? null)}`;
  }
}
