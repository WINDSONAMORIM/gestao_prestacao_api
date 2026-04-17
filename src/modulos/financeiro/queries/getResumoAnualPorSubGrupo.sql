WITH orcado AS (
  SELECT 
    sg.id AS subgrupo_id,
    sg.grupo_id,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN dim_tempo dt ON dt.id_data = o.id_data
  JOIN rubrica rb ON rb.id = o.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  WHERE dt.ano = $1 AND sg.grupo_id = $2::varchar
  GROUP BY sg.id, sg.grupo_id
),
realizado AS (
  SELECT 
    sg.id AS subgrupo_id,
    sg.grupo_id,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN dim_tempo dt ON dt.id_data = r.id_data
  JOIN rubrica rb ON rb.id = r.rubrica
  JOIN subgrupo sg ON sg.id = rb.subgrupo_id
  WHERE dt.ano = $1 AND sg.grupo_id = $2::varchar  
  GROUP BY sg.id, sg.grupo_id
)
SELECT 
  sg.id,
  sg.descricao,
  sg.grupo_id,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM subgrupo sg
LEFT JOIN orcado o ON o.subgrupo_id = sg.id
LEFT JOIN realizado r ON r.subgrupo_id = sg.id
WHERE sg.grupo_id = $2::varchar
ORDER BY sg.grupo_id, sg.id;