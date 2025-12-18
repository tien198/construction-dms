import { BidPackage } from 'src/construction/type/bidPackage.type';
import { BidderDto } from './bidder.dto';

export class BidPackageDto
  implements Partial<Omit<BidPackage, 'bidderSelectionTime'>>
{
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  cost: number;
  bidderSelectionTime: string;
  bidderSelectionMethod: string;
  successfulBidder?: BidderDto;
  // contractType: string
  upTo: string;
  isCompleted: boolean;
}
