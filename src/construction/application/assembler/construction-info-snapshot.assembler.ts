import { ConstructionInfoSnapshot } from 'src/construction/domain/document/construction-info.entity';
import {
  ConstructionInfoId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from 'src/construction/domain/document/value-objects/construction-info.vo';
import { ConstructionInfoSnapshotCommand } from '../commands/create-submission/construction-info-snapshot.command';

export class ConstructionInfoSnapshotAssembler {
  static fromCmd(
    cmd: ConstructionInfoSnapshotCommand,
  ): ConstructionInfoSnapshot {
    return new ConstructionInfoSnapshot(
      new ConstructionInfoId(cmd.id),
      new ConstructionName(cmd.name),
      new SourceOfFunds(cmd.source_of_funds),
      cmd.est_cost,
      new EstCostStr(cmd.est_cost_str),
      new Date(cmd.impl_start_date),
      new Date(cmd.impl_end_date),
      new ExistingCondition(cmd.existing_condition_of_the_structure),
      new RepairScope(cmd.repair_scope),
    );
  }
}
