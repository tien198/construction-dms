export class ConstructionInfoSnapshotRow {
  id: string;
  construction_id: string;
  submission_id: string;

  name: string;
  source_of_funds: string;

  est_cost: number;
  est_cost_str: string;

  impl_start_date: Date;
  impl_end_date: Date;

  existing_condition_of_the_structure: string;
  repair_scope: string;

  created_at: Date = new Date(Date.now());
}
