INSERT INTO administrative_documents (
  id,
  no,
  level,
  date,
  pursuant_to_dec_tct_id,
  pursuant_to_dec_tctmn_id
)
VALUES ($1, $2, $3, $4, $5, $6);
