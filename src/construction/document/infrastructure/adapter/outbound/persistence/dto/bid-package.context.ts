import { BidPackageSnapshot } from '../../../../../domain/bid-package.entity';

export type BidPackageContext = {
  bid_package: BidPackageSnapshot;
  construction_id: string;
  submission_id: string;
};
