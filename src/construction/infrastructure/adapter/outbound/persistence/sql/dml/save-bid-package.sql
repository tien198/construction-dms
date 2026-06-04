INSERT INTO bid_packages (
  id,

  construction_id,
  submission_id,

  type
)
VALUES (
  $1, $2, $3, $4
);