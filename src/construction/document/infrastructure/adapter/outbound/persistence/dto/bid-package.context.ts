import { ConstructionId } from 'src/construction/document/domain/value-objects/construction.vo';
import { BidPackageSnapshot } from '../../../../../domain/bid-package.entity';
import { Submission } from '../../../../../domain/submission.entity';

export type BidPackageContext = {
  bid_package: BidPackageSnapshot;
  construction_id: ConstructionId;
  submission: Submission;
};
