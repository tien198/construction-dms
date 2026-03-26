import { ConstructionInfoSnapshot } from '../../domain/entity/construction-infor.entity';
import { ConstructionInfoSnapshotCommand } from '../command/construction-info-snapshot.command';

export class ConstructionInfoSnapshotAssembler {
  static fromCmd(
    cmd: ConstructionInfoSnapshotCommand,
    constructionId: string,
  ): ConstructionInfoSnapshot {
    return ConstructionInfoSnapshot.create(
      constructionId,
      cmd.name,
      cmd.source_of_funds,
      cmd.est_cost,
      cmd.est_cost_str,
      new Date(cmd.impl_start_date),
      new Date(cmd.impl_end_date),
      cmd.existing_condition_of_the_structure,
      cmd.repair_scope,
    );
  }
}
