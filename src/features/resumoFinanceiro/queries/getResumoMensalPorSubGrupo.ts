import { prisma } from "../../../lib/prisma.js";
import { ParamsMensalGrupo } from "../../../schemas/paramsShema.js";
import { ResponseAnaliseOrcamentariaAnualPorSubGrupo } from "../../../schemas/responseSchema.js";

export const resumoMensalPorSubgrupo = async (params: ParamsMensalGrupo): Promise<ResponseAnaliseOrcamentariaAnualPorSubGrupo[]> => {
    const response = await prisma.$queryRaw<ResponseAnaliseOrcamentariaAnualPorSubGrupo[]>`
    WITH orcado AS (
      SELECT 
        sg.id_subgrupo,
        sg.id_grupo,
        SUM(o.valor) AS total_orcado
      FROM fato_orcado o
      JOIN dim_tempo dt ON dt.id_data = o.id_data
      JOIN rubrica rb ON rb.id_rubrica = o.id_rubrica
      JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
      WHERE dt.ano = ${params.ano}
        AND dt.mes = ${params.mes}
        AND sg.id_grupo = ${params.id_grupo}::varchar
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
      WHERE dt.ano = ${params.ano}
        AND dt.mes = ${params.mes}
        AND sg.id_grupo = ${params.id_grupo}::varchar
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
    WHERE sg.id_grupo = ${params.id_grupo}::varchar
    ORDER BY sg.id_subgrupo
    `;

    return response.map(item => ({
        id_grupo: item.id_grupo,
        id_subgrupo: item.id_subgrupo,
        descricao: item.descricao,
        orcado: item.orcado,
        realizado: item.realizado
    }));
};