import { Bidder } from '../type/bidder.type';
import { BidPackage } from '../type/bidPackage.type';

export class BidPackageImp implements BidPackage {
  arrayIndex?: number;
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  price: number;
  bidderSelectionTime: Date;
  bidderSelectionMethod: string;
  successfulBidder: Bidder;
  // contractType: string;
  upTo: string;
  isCompleted: boolean;
}
