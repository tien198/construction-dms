import { ConstructionInfoContext } from '../dto/construction-infor.context';
import { ConstructionInfoSnapshotRow } from '../model/construction-info.row';

export class ConstructionInfoMapper {
  static toPersistence(
    context: ConstructionInfoContext,
  ): ConstructionInfoSnapshotRow {
    const info = context.info;

    const entity = new ConstructionInfoSnapshotRow();

    entity.id = info.id.value!;
    entity.construction_id = context.construction_id;
    entity.submission_id = context.submission_id;

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
