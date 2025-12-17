import { BidPackage } from '../type/bidPackage.type';
import { BidderDto } from './bidder.dto';

export class CreateBidPackageDto
  implements Omit<BidPackage, 'bidderSelectionTime'>
{
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  price: number;
  bidderSelectionTime: string;
  bidderSelectionMethod: string;
  successfulBidder: BidderDto;
  // contractType: string
  upTo: string;
  isCompleted: boolean;
}
