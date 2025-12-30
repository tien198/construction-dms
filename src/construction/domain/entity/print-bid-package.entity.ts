import { Bidder } from '../type/bidder.type';
import { PrintBidPackage } from '../type/print-bid-package.type';

export class PrintBidPackageImp implements PrintBidPackage {
  type: 'TV' | 'TT' | 'TC';
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  cost: string;
  costString: string;
  bidderSelectionTime: string;
  bidderSelectionMethod: string;
  successfulBidder?: Bidder;
  upTo: string;
  isCompleted: boolean;
}
