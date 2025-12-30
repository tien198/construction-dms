import { Bidder } from '../type/bidder.type';
import { BidPackage } from '../type/bidPackage.type';
import { PrintBidPackage } from '../type/print-bid-package.type';

export class PrintBidPackageImp implements PrintBidPackage {
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  cost: string;
  bidderSelectionTime: string;
  bidderSelectionMethod: string;
  successfulBidder?: Bidder;
  upTo: string;
  isCompleted: boolean;

  constructor(bidPackage?: BidPackage) {
    if (bidPackage) {
      this.projectOwner = bidPackage.projectOwner;
      this.bidPackageName = bidPackage.bidPackageName;
      this.shortDescription = bidPackage.shortDescription;
      this.cost = bidPackage.cost.toString();
      this.bidderSelectionTime = bidPackage.bidderSelectionTime.toISOString();
      this.bidderSelectionMethod = bidPackage.bidderSelectionMethod;
      this.successfulBidder = bidPackage.successfulBidder;
      this.upTo = bidPackage.upTo;
      this.isCompleted = bidPackage.isCompleted;
    }
  }
}
