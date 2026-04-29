SELECT c.id, ci.name, ci.repair_scope, dec.date
FROM public.constructions c
JOIN (
-- Get the first decision - with the earliest creation date
  SELECT DISTINCT ON (d.construction_id) d.construction_id, ad.date
    FROM public.decisions d
    JOIN public.administrative_documents ad ON ad.id = d.id
    ORDER BY d.construction_id, ad.date ASC
) AS dec ON dec.construction_id = c.id
JOIN LATERAL (
-- Get the latest construction-infor - by created_at
-- It can be replace by "is_appoved" condition if there's approval function in application
  SELECT ci.construction_id, ci.name, ci.repair_scope
  FROM public.construction_info_snapshots ci
  WHERE c.id = ci.construction_id
  ORDER BY ci.created_at DESC
) AS ci 
ON c.id = ci.construction_id;











-- The first version, that isn't optimization performance

-- SELECT c.id, ci.name, ci.repair_scope, dec.date
-- FROM public.constructions c
-- JOIN (
--   SELECT DISTINCT ON (d.construction_id) d.construction_id, ad.date
--     FROM public.decisions d
--     JOIN public.administrative_documents ad ON ad.id = d.id
--     ORDER BY d.construction_id, ad.date ASC
-- ) AS dec ON dec.construction_id = c.id
-- JOIN (
--   SELECT DISTINCT ON (ci.construction_id) ci.*
--   FROM public.construction_info_snapshots ci
--   JOIN public.constructions c
--   ON c.id = ci.construction_id
--   ORDER BY ci.construction_id, ci.created_at DESC
-- ) AS ci
-- ON c.id = ci.construction_id;