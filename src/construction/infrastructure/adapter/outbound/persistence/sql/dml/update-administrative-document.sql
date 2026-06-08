UPDATE administrative_documents
SET 
    no = $1,
    level = $2,
    date = $3,
    pursuant_to_dec_tct_id = $4,
    pursuant_to_dec_ttmn_id = $5
WHERE id = $6;