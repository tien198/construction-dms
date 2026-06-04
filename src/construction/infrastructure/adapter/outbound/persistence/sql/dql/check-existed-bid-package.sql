SELECT EXISTS (
  SELECT 1
  FROM public.bid_packages
  WHERE id = $1
) AS exists
