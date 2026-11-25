-- Opens per resource over the last 7, 30 and 90 days (UTC, today included),
-- most opened over 30 days first. Run with `npm run counts`.
SELECT
  resource_id,
  SUM(CASE WHEN day >= date('now', '-6 days') THEN n ELSE 0 END) AS d7,
  SUM(CASE WHEN day >= date('now', '-29 days') THEN n ELSE 0 END) AS d30,
  SUM(n) AS d90
FROM opens
WHERE day >= date('now', '-89 days')
GROUP BY resource_id
ORDER BY d30 DESC, d90 DESC, resource_id;
