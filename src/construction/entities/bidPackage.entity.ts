import { Bidder } from 'src/construction/type/bidder.type';
import { BidPackage } from 'src/construction/type/bidPackage.type';

export class BidPackageImp implements BidPackage {
  projectOwner: string; // Công ty Trực thăng Miền Nam
  bidPackageName: string;
  shortDescription: string;
  cost: number;
  bidderSelectionTime: Date;
  bidderSelectionMethod: string;
  successfulBidder?: Bidder;
  // contractType: string;
  upTo: string;
  isCompleted: boolean;
}
