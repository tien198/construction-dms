import type { ConstructionInfoResDto } from './construction-info.res-dto';
import { AdminDocResDto } from './admin-doc.res-dto';
import type { BidPackageSnapshotResDto } from './bid-package.res-dto';

export class SubmissionResDto extends AdminDocResDto {
  construction_info_snapshot: ConstructionInfoResDto;
  bid_package_snapshots: BidPackageSnapshotResDto[];
}
