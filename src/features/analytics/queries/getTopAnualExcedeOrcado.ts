import { prisma } from "../../../lib/prisma.js"
import { ParamsAnual } from "../../../schemas/paramsShema.js"
import { ResponseTopExcedeOrcado } from "../../../schemas/responseSchema.js";

export const topAnualExcedeOrcado = async(params:ParamsAnual): Promise<ResponseTopExcedeOrcado[]> => {
  const response = await prisma.$queryRaw<ResponseTopExcedeOrcado[]>`
    WITH orcado AS (
      SELECT 
        sg.id_grupo,
        SUM(o.valor) AS total_orcado
      FROM fato_orcado o
      JOIN dim_tempo dt ON dt.id_data = o.id_data
      JOIN rubrica rb ON rb.id_rubrica = o.id_rubrica
      JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
      WHERE dt.ano = ${params.ano}
      GROUP BY sg.id_grupo
    ),
    realizado AS (
      SELECT 
        sg.id_grupo,
        SUM(r.valor) AS total_realizado
      FROM fato_realizado r
      JOIN dim_tempo dt ON dt.id_data = r.id_data
      JOIN rubrica rb ON rb.id_rubrica = r.id_rubrica
      JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
      WHERE dt.ano = ${params.ano}
      GROUP BY sg.id_grupo
    )
    SELECT 
      r.id_grupo,
      COALESCE(o.total_orcado, 0) AS orcado,
      r.total_realizado AS realizado,
      (r.total_realizado - COALESCE(o.total_orcado, 0)) AS diferenca,
    CASE 
      WHEN COALESCE(o.total_orcado, 0) = 0 
          AND r.total_realizado > 0 THEN 100
      WHEN COALESCE(o.total_orcado, 0) = 0 
          THEN 0
      ELSE ROUND(((r.total_realizado / o.total_orcado) * 100)::numeric, 2)::float
    END AS perc
    FROM realizado r
    LEFT JOIN orcado o ON o.id_grupo = r.id_grupo
    ORDER BY diferenca desc
    limit 5`;
    return response.map(item => ({
      id_grupo: item.id_grupo,
      orcado: item.orcado,
      realizado: item.realizado,
      diferenca: item.diferenca,
      perc: item.perc,
    }))
}