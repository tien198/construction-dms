INSERT INTO bid_package_snapshots (
  id,
  bid_package_id,
  submission_id,

  project_owner,
  name,
  short_desc,

  est_cost,
  est_cost_str,

  bidder_selection_time,
  bidder_selection_method,

  successful_bidder_id,
  duration,
  is_completed
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
);