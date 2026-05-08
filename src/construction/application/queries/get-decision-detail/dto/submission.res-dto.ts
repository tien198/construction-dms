import type { ConstructionInfoResDto } from './construction-info.res-dto';
import { AdminDocResDto } from './admin-doc.res-dto';
import type { BidPackageResDto } from './bid-package.res-dto';

export class SubmissionResDto extends AdminDocResDto {
  construction_infor_snapshot?: ConstructionInfoResDto | null;
  bid_package_snapshots?: BidPackageResDto[];
}
