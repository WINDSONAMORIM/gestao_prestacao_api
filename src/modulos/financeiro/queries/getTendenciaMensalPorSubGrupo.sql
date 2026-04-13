WITH orcado AS (
  SELECT 
    rb.subgrupo_id,
    o.mes,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN rubrica rb ON rb.id = o.rubrica
  GROUP BY rb.subgrupo_id, o.mes
),
realizado AS (
  SELECT 
    rb.subgrupo_id,
    r.mes,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN rubrica rb ON rb.id = r.rubrica
  GROUP BY rb.subgrupo_id, r.mes
)
SELECT 
  COALESCE(o.mes, r.mes) AS mes,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM orcado o
FULL OUTER JOIN realizado r 
  ON r.subgrupo_id = o.subgrupo_id 
 AND r.mes = o.mes
WHERE COALESCE(o.subgrupo_id, r.subgrupo_id) = $1
ORDER BY mes;