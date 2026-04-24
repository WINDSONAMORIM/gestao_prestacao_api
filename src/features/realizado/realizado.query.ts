import { prisma } from "../../lib/prisma.js";
import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { ResponseTotal } from "../../schemas/responseSchema.js";

export class RealizadoQuery{
    
    async realizadoAnualQuery(params: ParamsAnual) {
        const response = await prisma.$queryRaw<ResponseTotal[]>`
          SELECT COALESCE(SUM(valor), 0) as total 
            FROM fato_realizado fr
            JOIN dim_tempo dt ON dt.id_data = fr.id_data
            WHERE dt.ano = ${params.ano}`;

    return {total: response[0].total ?? 0}
    }

    async RealizadoMensalQuery(params: ParamsMensal) {
        const response = await prisma.$queryRaw<ResponseTotal[]>`
            SELECT COALESCE(SUM(fr.valor), 0) as total
                FROM fato_realizado fr
                JOIN dim_tempo dt ON dt.id_data = fr.id_data
                WHERE dt.ano = ${params.ano}
                AND dt.mes = ${params.mes}`;
    
            return { total: response[0]?.total ?? 0}
        }
}