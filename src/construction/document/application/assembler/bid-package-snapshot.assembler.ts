import { BidPackageSnapshot } from '../../domain/bid-package.entity';
import {
  BidderSelectionMethod,
  BidPackageName,
  Duration,
  ProjectOwner,
  ShortDesc,
  SuccessfulBidderId,
} from '../../domain/value-objects/bid-package-snapshot.vo';
import {
  ConstructionInfoId,
  EstCostStr,
} from '../../domain/value-objects/construction-info.vo';
import { BidPackageSnapshotCommand } from '../commands/create-submission/bid-package-snapshot.command';

export class BidPackageSnapshotAssembler {
  static fromCmd(
    cmd: BidPackageSnapshotCommand,
    constructionInforId: ConstructionInfoId,
  ): BidPackageSnapshot {
    return BidPackageSnapshot.create(
      constructionInforId,
      cmd.type,
      ProjectOwner.create(cmd.project_owner),
      BidPackageName.create(cmd.name),
      ShortDesc.create(cmd.short_desc),
      cmd.est_cost,
      EstCostStr.create(cmd.est_cost_str),
      new Date(cmd.bidder_selection_time),
      BidderSelectionMethod.create(cmd.bidder_selection_method),
      Duration.create(cmd.duration),
      cmd.is_completed,
      cmd.successful_bidder_id
        ? SuccessfulBidderId.create(cmd.successful_bidder_id)
        : null,
    );
  }

  static fromCmdList(
    cmds: BidPackageSnapshotCommand[],
    constructionInforId: ConstructionInfoId,
  ): BidPackageSnapshot[] {
    return cmds.map((cmd) =>
      BidPackageSnapshotAssembler.fromCmd(cmd, constructionInforId),
    );
  }
}
