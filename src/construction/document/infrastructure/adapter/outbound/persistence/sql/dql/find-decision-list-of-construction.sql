SELECT
  ad.id,
  ad.no,
  ad.date
FROM administrative_documents ad
JOIN decisions d
  ON ad.id = d.id
WHERE
  d.construction_id = $1
ORDER BY
  ad.date ASC;