import { BidPackageSnapshot } from 'src/construction/domain/document/bid-package.entity';
import {
  BidderSelectionMethod,
  BidPackageId,
  BidPackageName,
  Duration,
  ProjectOwner,
  ShortDesc,
  SuccessfulBidderId,
} from 'src/construction/domain/value-objects/bid-package-snapshot.vo';
import { EstCostStr } from 'src/construction/domain/value-objects/construction-info.vo';
import { BidPackageSnapshotCommand } from '../commands/create-submission/bid-package-snapshot.command';

export class BidPackageSnapshotAssembler {
  static fromCmd(cmd: BidPackageSnapshotCommand): BidPackageSnapshot {
    return new BidPackageSnapshot(
      new BidPackageId(cmd.id),
      cmd.type,
      new ProjectOwner(cmd.project_owner),
      new BidPackageName(cmd.name),
      new ShortDesc(cmd.short_desc),
      cmd.est_cost,
      new EstCostStr(cmd.est_cost_str),
      new Date(cmd.bidder_selection_time),
      new BidderSelectionMethod(cmd.bidder_selection_method),
      new Duration(cmd.duration),
      cmd.successful_bidder_id
        ? new SuccessfulBidderId(cmd.successful_bidder_id)
        : null,
    );
  }

  static fromCmdList(cmds: BidPackageSnapshotCommand[]): BidPackageSnapshot[] {
    return cmds.map((cmd) => BidPackageSnapshotAssembler.fromCmd(cmd));
  }
}
