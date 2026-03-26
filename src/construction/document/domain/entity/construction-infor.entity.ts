import { v7 } from 'uuid';
import { ConstructionId } from '../value-objects/construction.vo';
import {
  ConstructionInforId,
  ConstructionName,
  EstCostStr,
  ExistingCondition,
  RepairScope,
  SourceOfFunds,
} from '../value-objects/construction-infor.vo';

export class ConstructionInfoSnapshot {
  id: ConstructionInforId;
  construction_id: ConstructionId;

  name: ConstructionName;
  source_of_funds: SourceOfFunds;

  est_cost: number;
  est_cost_str: EstCostStr;

  impl_start_date: Date;
  impl_end_date: Date;

  existing_condition_of_the_structure: ExistingCondition;
  repair_scope: RepairScope;

  constructor(
    id: ConstructionInforId,
    construction_id: ConstructionId,
    name: ConstructionName,
    source_of_funds: SourceOfFunds,
    est_cost: number,
    est_cost_str: EstCostStr,
    impl_start_date: Date,
    impl_end_date: Date,
    existing_condition_of_the_structure: ExistingCondition,
    repair_scope: RepairScope,
  ) {
    this.id = id;
    this.construction_id = construction_id;
    this.name = name;
    this.source_of_funds = source_of_funds;
    this.est_cost = est_cost;
    this.est_cost_str = est_cost_str;
    this.impl_start_date = impl_start_date;
    this.impl_end_date = impl_end_date;
    this.existing_condition_of_the_structure =
      existing_condition_of_the_structure;
    this.repair_scope = repair_scope;
  }

  static create(
    construction_id: ConstructionId,
    name: ConstructionName,
    source_of_funds: SourceOfFunds,
    est_cost: number,
    est_cost_str: EstCostStr,
    impl_start_date: Date,
    impl_end_date: Date,
    existing_condition_of_the_structure: ExistingCondition,
    repair_scope: RepairScope,
  ): ConstructionInfoSnapshot {
    return new ConstructionInfoSnapshot(
      ConstructionInforId.create(v7()),
      construction_id,
      name,
      source_of_funds,
      est_cost,
      est_cost_str,
      impl_start_date,
      impl_end_date,
      existing_condition_of_the_structure,
      repair_scope,
    );
  }

  static reconstitute(
    id: ConstructionInforId,
    construction_id: ConstructionId,
    name: ConstructionName,
    source_of_funds: SourceOfFunds,
    est_cost: number,
    est_cost_str: EstCostStr,
    impl_start_date: Date,
    impl_end_date: Date,
    existing_condition_of_the_structure: ExistingCondition,
    repair_scope: RepairScope,
  ): ConstructionInfoSnapshot {
    return new ConstructionInfoSnapshot(
      id,
      construction_id,
      name,
      source_of_funds,
      est_cost,
      est_cost_str,
      impl_start_date,
      impl_end_date,
      existing_condition_of_the_structure,
      repair_scope,
    );
  }
}
