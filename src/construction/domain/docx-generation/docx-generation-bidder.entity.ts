import { BidderInfo } from 'src/construction/application/queries/get-decision-detail/dto/bid-package.res-dto';
import { StrConvert } from 'src/shared/type-ultility/string-converter';

export class DocxGenerationBidder implements Partial<StrConvert<BidderInfo>> {
  name: string;
  address: string;
  representative_name: string;
  representative_position: string;
  tax_id: string;
  phone_number: string;
  email: string;

  bank_account: string;

  constructor(bidder: BidderInfo) {
    this.name = bidder.name;
    this.address = bidder.address;
    this.representative_name = bidder.representative_name;
    this.representative_position = bidder.representative_position;
    this.tax_id = bidder.tax_id;
    this.phone_number = bidder.phone_number;
    this.email = bidder.email;
    this.bank_account = `${bidder.bank_account_number} tại Ngân hàng ${bidder.bank_name} - Chi Nhánh ${bidder.bank_branch}`;
  }
}
