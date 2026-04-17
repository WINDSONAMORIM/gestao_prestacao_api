WITH orcado AS (
  SELECT 
    sg.grupo_id,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN dim_tempo dt ON dt.id_data = o.id_data
  JOIN rubrica rb ON rb.id = o.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  WHERE dt.ano = $1
    AND dt.mes = $2
  GROUP BY sg.grupo_id
),
realizado AS (
  SELECT 
    sg.grupo_id,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN dim_tempo dt ON dt.id_data = r.id_data
  JOIN rubrica rb ON rb.id = r.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  WHERE dt.ano = $1
    AND dt.mes = $2
  GROUP BY sg.grupo_id
)
SELECT 
  g.id,
  g.descricao,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM grupo g
LEFT JOIN orcado o ON o.grupo_id = g.id
LEFT JOIN realizado r ON r.grupo_id = g.id
ORDER BY g.id;