UPDATE public.bidders
SET 
    name = $1,
    address = $2,
    representative_name = $3,
    representative_position = $4,
    bank_account_number = $5,
    bank_name = $6,
    bank_branch = $7,
    tax_id = $8,
    phone_number = $9,
    email = $10
WHERE id = $11;