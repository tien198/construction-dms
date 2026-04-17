SELECT
  id,
  no,
  date
FROM administrative_documents
WHERE
  level = 'TCT'
ORDER BY
  date DESC;