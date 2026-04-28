SELECT c.id, ci.name, ci.repair_scope, dec.date
FROM public.constructions c
JOIN (
  SELECT  DISTINCT ON (d.construction_id) d.construction_id, ad.date
    FROM public.decisions d
    JOIN public.administrative_documents ad ON ad.id = d.id
    ORDER BY d.construction_id, ad.date ASC
) AS dec ON dec.construction_id = c.id
JOIN public.construction_info_snapshots ci
ON c.current_snapshot_id = ci.id;
