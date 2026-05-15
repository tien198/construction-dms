INSERT INTO public.bidders
(
    name, 
    address, 
    representative_name, 
    representative_position,
    bank_account_number,
    tax_id,
    phone_number,
    email,
    id
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);