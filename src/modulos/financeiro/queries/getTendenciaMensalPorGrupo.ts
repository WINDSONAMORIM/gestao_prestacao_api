import { prisma } from "../../../lib/prisma.js"
import { ParamsGrupo } from "../../../schemas/paramsShema.js"
import { ResponseTendenciaMensal } from "../../../schemas/responseSchema.js";

export const getTendenciaMensalPorGrupo = async (params: ParamsGrupo): Promise<ResponseTendenciaMensal[]> => {
  const response = await prisma.$queryRaw<ResponseTendenciaMensal[]>`
    WITH orcado AS (
      SELECT 
        sg.id_grupo,
        o.mes,
        SUM(o.valor) AS total_orcado
      FROM fato_orcado o
      JOIN rubrica rb ON rb.id_rubrica = o.id_rubrica
      JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
      GROUP BY sg.id_grupo, o.mes
    ),
    realizado AS (
      SELECT 
        sg.id_grupo,
        r.mes,
        SUM(r.valor) AS total_realizado
      FROM fato_realizado r
      JOIN rubrica rb ON rb.id_rubrica = r.id_rubrica
      JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
      GROUP BY sg.id_grupo, r.mes
    )
    SELECT 
      COALESCE(o.mes, r.mes) AS mes,
      COALESCE(o.total_orcado, 0) AS orcado,
      COALESCE(r.total_realizado, 0) AS realizado
    FROM orcado o
    FULL OUTER JOIN realizado r 
      ON r.id_grupo = o.id_grupo 
    AND r.mes = o.mes
    WHERE COALESCE(o.id_grupo, r.id_grupo) = ${params.id_grupo}
    ORDER BY mes`;

    return response.map(item => ({
      mes: item.mes,
      orcado: item.orcado,
      realizado: item.realizado,
    }))
};