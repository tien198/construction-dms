import { BidPackageSnapshot } from '../../domain/entity/bid-package.entity';
import { BidPackageSnapshotCommand } from '../command/bid-package-snapshot.command';

export class BidPackageSnapshotAssembler {
  static fromCmd(
    cmd: BidPackageSnapshotCommand,
    constructionInforSnapshotId: string,
  ): BidPackageSnapshot {
    return BidPackageSnapshot.create(
      constructionInforSnapshotId,
      cmd.type,
      cmd.project_owner,
      cmd.name,
      cmd.short_desc,
      cmd.est_cost,
      cmd.est_cost_str,
      new Date(cmd.bidder_selection_time),
      cmd.bidder_selection_method,
      cmd.duration,
      cmd.is_completed,
      cmd.successful_bidder_id ?? undefined,
    );
  }

  static fromCmdList(
    cmds: BidPackageSnapshotCommand[],
    constructionInforSnapshotId: string,
  ): BidPackageSnapshot[] {
    return cmds.map((cmd) =>
      BidPackageSnapshotAssembler.fromCmd(cmd, constructionInforSnapshotId),
    );
  }
}
