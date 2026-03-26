import { ConstructionInfoSnapshot } from '../../domain/entity/construction-infor.entity';
import {
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../../domain/value-objects/construction-infor.vo';
import { ConstructionId } from '../../domain/value-objects/construction.vo';
import { ConstructionInfoSnapshotCommand } from '../command/construction-info-snapshot.command';

export class ConstructionInfoSnapshotAssembler {
  static fromCmd(
    cmd: ConstructionInfoSnapshotCommand,
    constructionId: ConstructionId,
  ): ConstructionInfoSnapshot {
    return ConstructionInfoSnapshot.create(
      constructionId,
      ConstructionName.create(cmd.name),
      SourceOfFunds.create(cmd.source_of_funds),
      cmd.est_cost,
      EstCostStr.create(cmd.est_cost_str),
      new Date(cmd.impl_start_date),
      new Date(cmd.impl_end_date),
      ExistingCondition.create(cmd.existing_condition_of_the_structure),
      RepairScope.create(cmd.repair_scope),
    );
  }
}
