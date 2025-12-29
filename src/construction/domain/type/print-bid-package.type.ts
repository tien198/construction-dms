import { BidPackage } from './bidPackage.type';

export interface PrintBidPackage
  extends Omit<BidPackage, 'bidderSelectionTime'> {
  bidderSelectionTime: string;
}
