export interface IConstructionInfoSnapshotCommand {
  id: string;

  name: string;

  source_of_funds: string;

  // impl - implementation
  impl_start_date: Date;

  impl_end_date: Date;

  existing_condition_of_the_structure: string;

  repair_scope: string;

  // est - estimated
  est_cost: number;

  est_cost_str: string;
}
