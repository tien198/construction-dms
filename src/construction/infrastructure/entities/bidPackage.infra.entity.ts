import { Bidder } from 'src/construction/domain/type/bidder.type';
import { BidPackage } from 'src/construction/domain/type/bidPackage.type';

export class InfraBidPackageImp implements BidPackage {
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
