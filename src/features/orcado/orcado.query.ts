import { prisma } from "../../lib/prisma.js";
import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { ResponseTotal } from "../../schemas/responseSchema.js";

export class OrcadoQuery {

    async orcadoAnualQuery(params: ParamsAnual) {
        const response = await prisma.$queryRaw<ResponseTotal[]>`
          SELECT COALESCE(SUM(valor), 0) as total 
            FROM fato_orcado fo
            JOIN dim_tempo dt ON dt.id_data = fo.id_data
            WHERE dt.ano = ${params.ano}`;
    
    return {total: response[0].total ?? 0}
    }

    async orcadoMensalQuery(params: ParamsMensal){
        const response = await prisma.$queryRaw<ResponseTotal[]>`
          SELECT COALESCE(SUM(fo.valor), 0) as total
            FROM fato_orcado fo
            JOIN dim_tempo dt ON dt.id_data = fo.id_data
            WHERE dt.ano = ${params.ano}
            AND dt.mes = ${params.mes}`;

    return { total: response[0]?.total ?? 0}
    }
}    