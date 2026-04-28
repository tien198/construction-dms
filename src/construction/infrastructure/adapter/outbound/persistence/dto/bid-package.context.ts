import { BidPackageSnapshot } from 'src/construction/domain/document/bid-package.entity';

export type BidPackageContext = {
  bid_package: BidPackageSnapshot;
  construction_id: string;
  submission_id: string;
};
