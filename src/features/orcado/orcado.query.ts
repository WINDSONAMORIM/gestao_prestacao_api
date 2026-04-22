import { prisma } from "../../lib/prisma.js";
import { ParamsMensal } from "../../schemas/paramsShema.js";
import { ResponseTotal } from "../../schemas/responseSchema.js";

export const orcadoMensal = async (params: ParamsMensal) : Promise<ResponseTotal> => {
    const response = await prisma.$queryRaw<ResponseTotal[]>`
          SELECT COALESCE(SUM(o.valor), 0) as total
            FROM fato_orcado o
            JOIN dim_tempo dt ON dt.id_data = o.id_data
            WHERE dt.ano = ${params.ano}
            AND dt.mes = ${params.mes}`;

    return { total: response[0]?.total ?? 0}
}
