SELECT
  json_build_object(
    'id',                   dec_ad.id,
    'no',                   dec_ad.no,
    'level',                dec_ad.level,
    'date',                 dec_ad.date,
    'pursuant_to_dec_tct',  CASE
                              WHEN dec_ad.pursuant_to_dec_tct_id IS NULL THEN NULL
                              ELSE json_build_object(
                                'id',   dec_ad_tct.id,
                                'no',   dec_ad_tct.no,
                                'date', dec_ad_tct.date
                              )
                            END,
    'pursuant_to_dec_ttmn', CASE
                              WHEN dec_ad.pursuant_to_dec_ttmn_id IS NULL THEN NULL
                              ELSE json_build_object(
                                'id',   dec_ad_ttmn.id,
                                'no',   dec_ad_ttmn.no,
                                'date', dec_ad_ttmn.date
                              )
                            END,
    'period',               d.period,
    'submissions',          COALESCE 
                            (
                              (
                                SELECT json_agg(
                                  json_build_object(
                                    'id',                          sub.id,
                                    'no',                          sub_ad.no,
                                    'level',                       sub_ad.level,
                                    'date',                        sub_ad.date,
                                    'pursuant_to_dec_tct',         CASE
                                                                     WHEN sub_ad.pursuant_to_dec_tct_id IS NULL THEN NULL
                                                                     ELSE json_build_object(
                                                                       'id',   dec_ad_tct.id,
                                                                       'no',   dec_ad_tct.no,
                                                                       'date', dec_ad_tct.date
                                                                     )
                                                                   END,
                                    'pursuant_to_dec_ttmn',        CASE
                                                                     WHEN sub_ad.pursuant_to_dec_ttmn_id IS NULL THEN NULL
                                                                     ELSE json_build_object(
                                                                       'id',   dec_ad_ttmn.id,
                                                                       'no',   dec_ad_ttmn.no,
                                                                       'date', dec_ad_ttmn.date
                                                                     )
                                                                   END,
                                    'construction_info_snapshot',  CASE
                                                                     WHEN ci.id IS NULL THEN NULL
                                                                     ELSE json_build_object(
                                                                       'id',                                  ci.id,
                                                                       'name',                                ci.name,
                                                                       'source_of_funds',                     ci.source_of_funds,
                                                                       'impl_start_date',                     ci.impl_start_date,
                                                                       'impl_end_date',                       ci.impl_end_date,
                                                                       'existing_condition_of_the_structure', ci.existing_condition_of_the_structure,
                                                                       'repair_scope',                        ci.repair_scope,
                                                                       'est_cost',                            ci.est_cost,
                                                                       'est_cost_str',                        ci.est_cost_str
                                                                     )
                                                                   END,
                                    'bid_package_snapshots',       COALESCE
                                                                    (
                                                                     (
                                                                       WITH bp AS (
                                                                         SELECT DISTINCT ON (bp_inner.type)
                                                                           bp_inner.*,
                                                                           sub_ad_inner.date AS sub_date
                                                                         FROM public.bid_package_snapshots bp_inner
                                                                         JOIN public.administrative_documents sub_ad_inner
                                                                           ON sub_ad_inner.id = bp_inner.submission_id
                                                                         WHERE sub_ad_inner.date <= sub_ad.date
                                                                         ORDER BY bp_inner.type, sub_ad_inner.date DESC, bp_inner.created_at DESC
                                                                       )
                                                                       SELECT json_agg(
                                                                         json_build_object(
                                                                           'id',                      bp.id,
                                                                           'type',                    bp.type,
                                                                           'project_owner',            bp.project_owner,
                                                                           'name',                    bp.name,
                                                                           'short_desc',              bp.short_desc,
                                                                           'est_cost',                bp.est_cost,
                                                                           'est_cost_str',            bp.est_cost_str,
                                                                           'bidder_selection_time',   bp.bidder_selection_time,
                                                                           'bidder_selection_method', bp.bidder_selection_method,
                                                                           'successful_bidder_id',    bp.successful_bidder_id,
                                                                           'duration',                bp.duration,
                                                                           'is_completed',            bp.is_completed
                                                                         )
                                                                         ORDER BY sub_date DESC
                                                                       )
                                                                       FROM bp
                                                                     ),
                                                                     '[]'::json
                                                                    )
                                  )
                                )
                                FROM public.submissions sub
                                LEFT JOIN public.administrative_documents sub_ad
                                  ON sub_ad.id = sub.id
                                -- submission -> construction_info_snapshots (optional)
                                JOIN LATERAL (
                                  -- using LATERAL to find the last construction_info_snapshots of submission history
                                  -- it can be replaced by "is_approved" if there is approve function in the application
                                  SELECT ci.*
                                  FROM public.construction_info_snapshots ci
                                  JOIN public.administrative_documents sub_ad_lateral
                                    ON sub_ad_lateral.id = ci.submission_id
                                  WHERE sub_ad_lateral.date <= sub_ad.date
                                    AND ci.construction_id = d.construction_id
                                  ORDER BY sub_ad_lateral.date DESC, ci.created_at DESC
                                  LIMIT 1
                                ) AS ci ON true
                                WHERE sub.decision_id = dec_ad.id
                              ),
                              '[]'::json
                            )
  ) AS result
FROM public.decisions d
-- decision -> administrative_documents (cùng id)
JOIN public.administrative_documents dec_ad
  ON dec_ad.id = d.id

-- administrative_documents -> pursuant_to_dec_tct (optional)
LEFT JOIN public.administrative_documents dec_ad_tct
  ON dec_ad_tct.id = dec_ad.pursuant_to_dec_tct_id

-- administrative_documents -> pursuant_to_dec_ttmn (optional)
LEFT JOIN public.administrative_documents dec_ad_ttmn
  ON dec_ad_ttmn.id = dec_ad.pursuant_to_dec_ttmn_id

WHERE d.construction_id = $1
  AND d.period = $2; 

-- WHERE d.construction_id = '019ddc58-e541-7217-a783-f4bcd5627054'
--   AND d.period = 'KH_LCNT';