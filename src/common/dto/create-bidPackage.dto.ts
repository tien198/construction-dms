import { BidderDto } from './bidder.dto';

export type CreateBidPackageDto = {
  projectOwner: string;
  bidPackageName: string;
  shortDescription: string;
  price: number;
  bidderSelectionTime: Date;
  bidderSelectionMethod: string;
  successfulBidder: BidderDto;
  // contractType: string
  upTo: string;
  isCompleted: boolean;
};
