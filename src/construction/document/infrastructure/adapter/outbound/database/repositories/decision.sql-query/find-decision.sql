SELECT
  json_build_object(
    'id',                      d.id,
    'no',                      ad.no,
    'level',                   ad.level,
    'date',                    ad.date,
    'pursuant_to_dec_tct',     CASE
                                 WHEN ad.pursuant_to_dec_tct_id IS NULL THEN NULL
                                 ELSE json_build_object(
                                   'id',   tct.id,
                                   'no',   tct.no,
                                   'date', tct.date
                                 )
                               END,
    'pursuant_to_dec_ttmn',    CASE
                                 WHEN ad.pursuant_to_dec_ttmn_id IS NULL THEN NULL
                                 ELSE json_build_object(
                                   'id',   ttmn.id,
                                   'no',   ttmn.no,
                                   'date', ttmn.date
                                 )
                               END,
    'period',                  d.period,
    'submission',              json_build_object(
                                 'id',                            sub.id,
                                 'no',                            sub_ad.no,
                                 'level',                         sub_ad.level,
                                 'date',                          sub_ad.date,
                                 'pursuant_to_dec_tct',           CASE
                                                                    WHEN sub_ad.pursuant_to_dec_tct_id IS NULL THEN NULL
                                                                    ELSE json_build_object(
                                                                      'id',   sub_tct.id,
                                                                      'no',   sub_tct.no,
                                                                      'date', sub_tct.date
                                                                    )
                                                                  END,
                                 'pursuant_to_dec_ttmn',          CASE
                                                                    WHEN sub_ad.pursuant_to_dec_ttmn_id IS NULL THEN NULL
                                                                    ELSE json_build_object(
                                                                      'id',   sub_ttmn.id,
                                                                      'no',   sub_ttmn.no,
                                                                      'date', sub_ttmn.date
                                                                    )
                                                                  END,
                                 'is_change_construction_infor',  sub.is_change_construction_infor,
                                 'construction_infor_snapshot',   CASE
                                                                    WHEN cis.id IS NULL THEN NULL
                                                                    ELSE json_build_object(
                                                                      'id',                                cis.id,
                                                                      'name',                              cis.name,
                                                                      'source_of_funds',                   cis.source_of_funds,
                                                                      'impl_start_date',                   cis.impl_start_date,
                                                                      'impl_end_date',                     cis.impl_end_date,
                                                                      'existing_condition_of_the_structure', cis.existing_condition_of_the_structure,
                                                                      'repair_scope',                      cis.repair_scope,
                                                                      'est_cost',                          cis.est_cost,
                                                                      'est_cost_str',                      cis.est_cost_str,
                                                                      'bid_package_snapshots',             COALESCE(
                                                                                                             (
                                                                                                               SELECT json_agg(
                                                                                                                 json_build_object(
                                                                                                                   'id',                       bp.id,
                                                                                                                   'type',                     bp.type,
                                                                                                                   'project_owner',            bp.project_owner,
                                                                                                                   'name',                     bp.name,
                                                                                                                   'short_desc',               bp.short_desc,
                                                                                                                   'est_cost',                 bp.est_cost,
                                                                                                                   'est_cost_str',             bp.est_cost_str,
                                                                                                                   'bidder_selection_time',    bp.bidder_selection_time,
                                                                                                                   'bidder_selection_method',  bp.bidder_selection_method,
                                                                                                                   'successful_bidder_id',     bp.successful_bidder_id,
                                                                                                                   'duration',                 bp.duration,
                                                                                                                   'is_completed',             bp.is_completed
                                                                                                                 )
                                                                                                               )
                                                                                                               FROM bid_package_snapshots bp
                                                                                                               WHERE bp.construction_infor_snapshot_id = cis.id
                                                                                                             ),
                                                                                                             '[]'::json
                                                                                                           )
                                                                    )
                                                                  END
                               )
  ) AS result
FROM decisions d
-- decision -> administrative_documents (cùng id)
JOIN administrative_documents ad
  ON ad.id = d.id
-- administrative_documents -> pursuant_to_dec_tct (optional)
LEFT JOIN administrative_documents tct
  ON tct.id = ad.pursuant_to_dec_tct_id
-- administrative_documents -> pursuant_to_dec_ttmn (optional)
LEFT JOIN administrative_documents ttmn
  ON ttmn.id = ad.pursuant_to_dec_ttmn_id
-- decision -> submission (lấy submission mới nhất theo created_at)
JOIN LATERAL (
  SELECT *
  FROM submissions s
  WHERE s.decision_id = d.id
  ORDER BY s.created_at DESC
  LIMIT 1
) sub ON true
-- submission -> administrative_documents
JOIN administrative_documents sub_ad
  ON sub_ad.id = sub.id
LEFT JOIN administrative_documents sub_tct
  ON sub_tct.id = sub_ad.pursuant_to_dec_tct_id
LEFT JOIN administrative_documents sub_ttmn
  ON sub_ttmn.id = sub_ad.pursuant_to_dec_ttmn_id
-- submission -> construction_info_snapshots (optional)
LEFT JOIN construction_infor_snapshots cis
  ON cis.id = sub.construction_infor_snapshot_id
WHERE d.construction_id = $1
  AND d.period = $2;