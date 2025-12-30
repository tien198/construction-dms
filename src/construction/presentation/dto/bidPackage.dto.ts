import { BidPackage } from 'src/construction/domain/type/bidPackage.type';
import { BidderDto } from './bidder.dto';

export class BidPackageDto
  implements Partial<Omit<BidPackage, 'bidderSelectionTime'>>
{
  type: 'TV' | 'TT' | 'TC';
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  cost: number;
  costString: string;
  bidderSelectionTime: string;
  bidderSelectionMethod: string;
  successfulBidder?: BidderDto;
  // contractType: string
  upTo: string;
  isCompleted: boolean;
}
