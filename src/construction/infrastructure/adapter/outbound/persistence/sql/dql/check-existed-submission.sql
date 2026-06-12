SELECT EXISTS (
  SELECT 1
  FROM public.submissions
  WHERE id = $1
) AS exists
