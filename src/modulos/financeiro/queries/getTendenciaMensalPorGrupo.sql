WITH orcado AS (
  SELECT 
    sg.grupo_id,
    o.mes,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN rubrica rb ON rb.id = o.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  GROUP BY sg.grupo_id, o.mes
),
realizado AS (
  SELECT 
    sg.grupo_id,
    r.mes,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN rubrica rb ON rb.id = r.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  GROUP BY sg.grupo_id, r.mes
)
SELECT 
  COALESCE(o.mes, r.mes) AS mes,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM orcado o
FULL OUTER JOIN realizado r 
  ON r.grupo_id = o.grupo_id 
 AND r.mes = o.mes
WHERE COALESCE(o.grupo_id, r.grupo_id) = $1
ORDER BY mes;