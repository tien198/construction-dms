import { BidPackage } from './bidPackage.type';

export interface PrintBidPackage
  extends Omit<BidPackage, 'cost' | 'bidderSelectionTime'> {
  cost: string;
  bidderSelectionTime: string;
}
