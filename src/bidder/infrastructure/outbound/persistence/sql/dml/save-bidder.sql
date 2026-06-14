INSERT INTO public.bidders
(
    name, 
    address, 
    representative_name, 
    representative_position,
    bank_account_number,
    bank_name,
    bank_branch,
    tax_id,
    phone_number,
    email,
    id
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);