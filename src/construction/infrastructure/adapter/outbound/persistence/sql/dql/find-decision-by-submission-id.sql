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
                                                                           bp_inner.type as type,
                                                                           bp_snapshot_inner.*,
                                                                           sub_ad_inner.date AS sub_date,
                                                                           approval_dec.no AS approval_no,
                                                                           approval_dec.date AS approval_date
                                                                           
                                                                         FROM public.bid_packages bp_inner
                                                                         
                                                                         JOIN public.bid_package_snapshots bp_snapshot_inner
                                                                           ON bp_inner.id = bp_snapshot_inner.bid_package_id

                                                                         JOIN public.administrative_documents sub_ad_inner
                                                                           ON sub_ad_inner.id = bp_snapshot_inner.submission_id

                                                                         JOIN public.submissions sub_inner
                                                                           ON sub_inner.id = bp_snapshot_inner.submission_id
                                                                         JOIN public.administrative_documents approval_dec
                                                                           ON approval_dec.id = sub_inner.decision_id

                                                                         

                                                                         
                                                                         WHERE sub_ad_inner.date <= sub_ad.date
                                                                         ORDER BY bp_inner.type, sub_ad_inner.date DESC, bp_snapshot_inner.created_at DESC
                                                                       )
                                                                       SELECT json_agg(
                                                                         json_build_object(
                                                                           'id',                      bp.id,
                                                                           'bid_package_id',          bp.bid_package_id,
                                                                           'type',                    bp.type,
                                                                           'project_owner',           bp.project_owner,
                                                                           'name',                    bp.name,
                                                                           'short_desc',              bp.short_desc,
                                                                           'est_cost',                bp.est_cost,
                                                                           'est_cost_str',            bp.est_cost_str,
                                                                           'bidder_selection_time',   bp.bidder_selection_time,
                                                                           'bidder_selection_method', bp.bidder_selection_method,
                                                                           'successful_bidder',    json_build_object(
                                                                             'name',                    bidder.name,
                                                                             'address',                 bidder.address,
                                                                             'representative_name',     bidder.representative_name,
                                                                             'representative_position', bidder.representative_position,
                                                                             'bank_account_number',     bidder.bank_account_number,
                                                                             'tax_id',                  bidder.tax_id,
                                                                             'phone_number',            bidder.phone_number,
                                                                             'email',                   bidder.email
                                                                           ),
                                                                           'duration',                bp.duration,
                                                                           'is_completed',            bp.is_completed,
                                                                           'contract_no',             contract.no,
                                                                           'contract_signing_date',   contract.signing_date,
                                                                           'approval_no',             bp.approval_no,
                                                                           'approval_date',           bp.approval_date
                                                                         )
                                                                         ORDER BY sub_date DESC
                                                                       )
                                                                       FROM bp
                                                                       LEFT JOIN public.contracts AS contract
                                                                         ON contract.bid_package_id = bp.bid_package_id
                                                                       LEFT JOIN public.bidders AS bidder
                                                                         ON bidder.id = bp.successful_bidder_id
                                                                     ),
                                                                     '[]'::json
                                                                    )
                                  )
                                )
                                FROM public.administrative_documents sub_ad
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
                                WHERE sub_ad.id = sub.id
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
JOIN public.submissions sub
  ON d.id = sub.decision_id

WHERE sub.id = $1;
