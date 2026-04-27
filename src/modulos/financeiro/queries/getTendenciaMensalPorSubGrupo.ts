import { prisma } from "../../../lib/prisma.js"
import { ParamsSubGrupo } from "../../../schemas/paramsShema.js"
import { ResponseTendenciaMensal } from "../../../schemas/responseSchema.js"

export const tendenciaMensalPorSubGrupo = async (params: ParamsSubGrupo): Promise<ResponseTendenciaMensal[]> => {
  const response = await prisma.$queryRaw<ResponseTendenciaMensal[]>`
    WITH orcado AS (
      SELECT 
        rb.id_subgrupo,
        o.mes,
        SUM(o.valor) AS total_orcado
      FROM fato_orcado o
      JOIN rubrica rb ON rb.id = o.id_rubrica
      GROUP BY rb.id_subgrupo, o.mes
    ),
    realizado AS (
      SELECT 
        rb.id_subgrupo,
        r.mes,
        SUM(r.valor) AS total_realizado
      FROM fato_realizado r
      JOIN rubrica rb ON rb.id = r.id_rubrica
      GROUP BY rb.id_subgrupo, r.mes
    )
    SELECT 
      COALESCE(o.mes, r.mes) AS mes,
      COALESCE(o.total_orcado, 0) AS orcado,
      COALESCE(r.total_realizado, 0) AS realizado
    FROM orcado o
    FULL OUTER JOIN realizado r 
      ON r.id_subgrupo = o.id_subgrupo 
    AND r.mes = o.mes
    WHERE COALESCE(o.id_subgrupo, r.id_subgrupo) = ${params.id_subgrupo}
    ORDER BY mes`;
    return response.map(item => ({
      mes: item.mes,
      orcado: item.orcado,
      realizado: item.realizado,
    }))
}