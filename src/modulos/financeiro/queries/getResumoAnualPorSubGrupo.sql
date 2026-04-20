WITH orcado AS (
  SELECT 
    sg.id_subgrupo,
    sg.id_grupo,
    SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN dim_tempo dt ON dt.id_data = o.id_data
  JOIN rubrica rb ON rb.id_rubrica = o.id_rubrica
  JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
  WHERE dt.ano = $1 AND sg.id_grupo = $2::varchar
  GROUP BY sg.id_subgrupo, sg.id_grupo
),
realizado AS (
  SELECT 
    sg.id_subgrupo,
    sg.id_grupo,
    SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN dim_tempo dt ON dt.id_data = r.id_data
  JOIN rubrica rb ON rb.id_rubrica = r.id_rubrica
  JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
  WHERE dt.ano = $1 AND sg.id_grupo = $2::varchar  
  GROUP BY sg.id_subgrupo, sg.id_grupo
)
SELECT 
  sg.id_subgrupo,
  sg.descricao,
  sg.id_grupo,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM subgrupo sg
LEFT JOIN orcado o ON o.id_subgrupo = sg.id_subgrupo
LEFT JOIN realizado r ON r.id_subgrupo = sg.id_subgrupo
WHERE sg.id_grupo = $2::varchar
ORDER BY sg.id_grupo, sg.id_subgrupo;