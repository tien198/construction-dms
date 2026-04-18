import { BidPackageSnapshot } from '../../domain/bid-package.entity';
import { ConstructionInfoSnapshot } from '../../domain/construction-info.entity';
import {
  ConstructionInfoId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../../domain/value-objects/construction-info.vo';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { ConstructionInfoSnapshotCommand } from '../commands/create-submission/construction-info-snapshot.command';

export class ConstructionInfoSnapshotAssembler {
  static fromCmd(
    cmd: ConstructionInfoSnapshotCommand,
    constructionId: ConstructionId,
    bid_packages: BidPackageSnapshot[],
  ): ConstructionInfoSnapshot {
    return new ConstructionInfoSnapshot(
      new ConstructionInfoId(null),
      constructionId,
      ConstructionName.create(cmd.name),
      SourceOfFunds.create(cmd.source_of_funds),
      cmd.est_cost,
      EstCostStr.create(cmd.est_cost_str),
      new Date(cmd.impl_start_date),
      new Date(cmd.impl_end_date),
      ExistingCondition.create(cmd.existing_condition_of_the_structure),
      RepairScope.create(cmd.repair_scope),
      bid_packages,
    );
  }
}
