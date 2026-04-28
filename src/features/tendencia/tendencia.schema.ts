import { paramsGrupoSchema, paramsSubGrupoSchema } from "../../schemas/paramsShema.js";
import { financeiroTendenciaMensalSchema } from "../resumoFinanceiro/resumoFinanceiro.schema.js";

export const tendenciaGrupoRouteSchema = {
    schema: {
        params: paramsGrupoSchema,
        description: "Rota para obter a tendência mensal por grupo financeiro",
        tags: ["Tendencia"],
        response: {
            200: financeiroTendenciaMensalSchema,
        },
    },
}

export const tendenciaSubGrupoRouteSchema = {
    schema: {
        params: paramsSubGrupoSchema,
        description: "Rota para obter a tendência mensal por grupo financeiro",
        tags: ["Tendencia"],
        response: {
            200: financeiroTendenciaMensalSchema,
        },
    },
}