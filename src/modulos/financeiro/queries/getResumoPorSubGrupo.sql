WITH orcado AS (
  SELECT 
    rb.subgrupo_id,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN rubrica rb ON rb.id = o.rubrica
  GROUP BY rb.subgrupo_id
),
realizado AS (
  SELECT 
    rb.subgrupo_id,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN rubrica rb ON rb.id = r.rubrica
  GROUP BY rb.subgrupo_id
)
SELECT 
  sg.id,
  sg.descricao,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM subgrupo sg
LEFT JOIN orcado o ON o.subgrupo_id = sg.id
LEFT JOIN realizado r ON r.subgrupo_id = sg.id
WHERE sg.grupo_id = $1
ORDER BY sg.id;