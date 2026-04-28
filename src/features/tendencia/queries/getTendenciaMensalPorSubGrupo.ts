import { prisma } from "../../../lib/prisma.js"
import { ParamsSubGrupo } from "../../../schemas/paramsShema.js"
import { ResponseTendenciaMensal } from "../../../schemas/responseSchema.js"

export const tendenciaMensalPorSubGrupo = async (params: ParamsSubGrupo): Promise<ResponseTendenciaMensal[]> => {
  const response = await prisma.$queryRaw<ResponseTendenciaMensal[]>`
    WITH orcado AS (
  SELECT 
    sg.id_grupo,
    sg.id_subgrupo,
    o.mes,
    SUM(o.valor) AS orcado
  FROM fato_orcado o
  JOIN rubrica r ON o.id_rubrica = r.id_rubrica
  JOIN subgrupo sg ON r.id_subgrupo = sg.id_subgrupo
  GROUP BY sg.id_grupo, sg.id_subgrupo, o.mes
),
realizado AS (
  SELECT 
    sg.id_grupo,
    sg.id_subgrupo,
    o.mes,
    SUM(o.valor) AS realizado
  FROM fato_realizado o
  JOIN rubrica r ON o.id_rubrica = r.id_rubrica
  JOIN subgrupo sg ON r.id_subgrupo = sg.id_subgrupo
  GROUP BY sg.id_grupo, sg.id_subgrupo, o.mes
)
SELECT 
  COALESCE(o.id_grupo, rea.id_grupo) AS id_grupo,
  COALESCE(o.id_subgrupo, rea.id_subgrupo) AS id_subgrupo,
  COALESCE(o.mes, rea.mes) AS mes,
  o.orcado,
  rea.realizado
FROM orcado o
FULL OUTER JOIN realizado rea ON o.id_grupo = rea.id_grupo 
  AND o.id_subgrupo = rea.id_subgrupo 
  AND o.mes = rea.mes
WHERE COALESCE(o.id_grupo, rea.id_grupo) = ${params.id_grupo} 
  AND COALESCE(o.id_subgrupo, rea.id_subgrupo) = ${params.id_subgrupo}
ORDER BY mes`;
    return response.map(item => ({
      mes: item.mes,
      orcado: item.orcado,
      realizado: item.realizado,
    }))
}