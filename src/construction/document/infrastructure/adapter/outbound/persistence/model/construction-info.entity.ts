import { ConstructionInfoSnapshot } from 'src/construction/document/domain/construction-info.entity';

export class ConstructionInfoSnapshotModel {
  public id: string;
  public construction_id: string;

  public name: string;
  public source_of_funds: string;

  public est_cost: number;
  public est_cost_str: string;

  public impl_start_date: Date;
  public impl_end_date: Date;

  public existing_condition_of_the_structure: string;
  public repair_scope: string;

  constructor(conInfo: ConstructionInfoSnapshot) {
    this.id = conInfo.id.value!;
    this.construction_id = conInfo.construction_id.value!;
    this.name = conInfo.name.value;
    this.source_of_funds = conInfo.source_of_funds.value;
    this.est_cost = conInfo.est_cost;
    this.est_cost_str = conInfo.est_cost_str.value;
    this.impl_start_date = conInfo.impl_start_date;
    this.impl_end_date = conInfo.impl_end_date;
    this.existing_condition_of_the_structure =
      conInfo.existing_condition_of_the_structure.value;
    this.repair_scope = conInfo.repair_scope.value;
  }
}
