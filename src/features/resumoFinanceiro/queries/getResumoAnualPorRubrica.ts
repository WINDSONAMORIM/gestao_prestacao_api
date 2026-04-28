import { prisma } from "../../../lib/prisma.js";
import { ParamsAnualSubGrupo } from "../../../schemas/paramsShema.js";
import { ResponseAnaliseOrcamentariaAnualPorRubrica } from "../../../schemas/responseSchema.js";

export const resumoAnualPorRubrica = async (params: ParamsAnualSubGrupo): Promise<ResponseAnaliseOrcamentariaAnualPorRubrica[]> => {
    const response = await prisma.$queryRaw<ResponseAnaliseOrcamentariaAnualPorRubrica[]>`
        WITH orcado AS (
        SELECT 
            fo.id_rubrica, 
            SUM(fo.valor) AS valor
        FROM fato_orcado fo
        JOIN dim_tempo dt ON fo.id_data = dt.id_data
        WHERE dt.ano = ${params.ano}
        GROUP BY fo.id_rubrica
        ),
        realizado AS (
        SELECT 
            fr.id_rubrica, 
            SUM(fr.valor) AS valor
        FROM fato_realizado fr
        JOIN dim_tempo dt ON fr.id_data = dt.id_data
        WHERE dt.ano = ${params.ano}
        GROUP BY fr.id_rubrica
        )
        SELECT 
        rb.id_rubrica,
        rb.descricao, 
        rb.id_subgrupo, 
        sg.id_grupo, 
        COALESCE(o.valor, 0) AS orcado, 
        COALESCE(r.valor, 0) AS realizado
        FROM rubrica rb
        JOIN subgrupo sg ON sg.id_subgrupo = rb.id_subgrupo
        JOIN grupo g ON g.id_grupo = sg.id_grupo
        LEFT JOIN orcado o ON o.id_rubrica = rb.id_rubrica
        LEFT JOIN realizado r ON r.id_rubrica = rb.id_rubrica
        WHERE g.id_grupo = ${params.id_grupo}
        AND sg.id_subgrupo = ${params.id_subgrupo}
        ORDER BY sg.id_grupo, sg.id_subgrupo, rb.id_rubrica`;
    return response.map(item => ({
        id_grupo: item.id_grupo,
        id_subgrupo: item.id_subgrupo,
        id_rubrica: item.id_rubrica,
        descricao: item.descricao,
        orcado: item.orcado,
        realizado: item.realizado
    }));
}