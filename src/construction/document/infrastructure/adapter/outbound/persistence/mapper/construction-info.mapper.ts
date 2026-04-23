import { Decision } from '../../../../../domain/decision.entity';
import { ConstructionInfoSnapshotEntity } from '../model/construction-info.entity';

export class ConstructionInfoMapper {
  static toPersistence(
    decision: Decision,
  ): ConstructionInfoSnapshotEntity | null {
    const submission = decision.submissions[0];
    if (!submission?.construction_info) {
      return null;
    }

    const info = submission.construction_info;

    const entity = new ConstructionInfoSnapshotEntity();

    entity.id = info.id.value!;
    entity.construction_id = decision.construction_id.value!;
    entity.submission_id = submission.id.value!;

    entity.name = info.name.value;
    entity.source_of_funds = info.source_of_funds.value;

    entity.est_cost = info.est_cost;
    entity.est_cost_str = info.est_cost_str.value;

    entity.impl_start_date = info.impl_start_date;
    entity.impl_end_date = info.impl_end_date;

    entity.existing_condition_of_the_structure =
      info.existing_condition_of_the_structure.value;
    entity.repair_scope = info.repair_scope.value;

    entity.created_at = new Date(Date.now());
    return entity;
  }
}
