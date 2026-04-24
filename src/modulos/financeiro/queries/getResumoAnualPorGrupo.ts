import { prisma } from "../../../lib/prisma.js";
import { ParamsAnual } from "../../../schemas/paramsShema.js";
import { ResponseAnaliseOrcamentariaAnualPorGrupo } from "../../../schemas/responseSchema.js";

export const resumoAnualPorGrupo = async (params: ParamsAnual): Promise<ResponseAnaliseOrcamentariaAnualPorGrupo[]> => {
  const response = await prisma.$queryRaw<ResponseAnaliseOrcamentariaAnualPorGrupo[]>`
  WITH orcado AS (
  SELECT sg.id_grupo, SUM(o.valor) AS total_orcado
  FROM fato_orcado o
  JOIN dim_tempo dt ON dt.id_data = o.id_data
  JOIN rubrica rb ON rb.id_rubrica = o.id_rubrica
  JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
  WHERE dt.ano = ${params.ano}
  GROUP BY sg.id_grupo
),
realizado AS (
  SELECT sg.id_grupo, SUM(r.valor) AS total_realizado
  FROM fato_realizado r
  JOIN dim_tempo dt ON dt.id_data = r.id_data
  JOIN rubrica rb ON rb.id_rubrica = r.id_rubrica
  JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
  WHERE dt.ano = ${params.ano}
  GROUP BY sg.id_grupo
)
SELECT 
  g.id_grupo, g.descricao,
  COALESCE(o.total_orcado, 0) AS orcado,
  COALESCE(r.total_realizado, 0) AS realizado
FROM grupo g
LEFT JOIN orcado o ON o.id_grupo = g.id_grupo
LEFT JOIN realizado r ON r.id_grupo = g.id_grupo
ORDER BY g.id_grupo`;

  return response.map(item => ({
    id_grupo: item.id_grupo,
    descricao: item.descricao,
    orcado: item.orcado,
    realizado: item.realizado,
  }));
}