UPDATE public.contracts
SET bid_package_id = $1,
    no = $2,
    signing_date = $3
WHERE id = $4;