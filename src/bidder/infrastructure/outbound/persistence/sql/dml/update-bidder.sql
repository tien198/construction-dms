UPDATE public.bidders
SET 
    name = $1,
    address = $2,
    representative_name = $3,
    representative_position = $4,
    bank_account_number = $5,
    tax_id = $6,
    phone_number = $7,
    email = $8
WHERE id = $9;