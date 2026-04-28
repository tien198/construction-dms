INSERT INTO construction_info_snapshots (
  id,
  construction_id,
  submission_id,

  name,
  source_of_funds,

  est_cost,
  est_cost_str,

  impl_start_date,
  impl_end_date,

  existing_condition_of_the_structure,
  repair_scope,

  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);