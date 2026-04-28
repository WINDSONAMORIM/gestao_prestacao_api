import { z } from "zod";
import { paramsAnualGrupoSchema, paramsAnualSchema, paramsAnualSubGrupoSchema, paramsMensalGrupoSchema, paramsMensalSchema, paramsMensalSubGrupoSchema } from "../../schemas/paramsShema.js";
import { apiResponsePorGrupoSchema, apiResponsePorRubricaSchema, apiResponsePorSubGrupoSchema } from "../../schemas/responseSchema.js";

export const financeiroAnualGrupoRouteSchema = {
  schema: {
    params: paramsAnualSchema,
    description: "Rota para obter o resumo anual por grupo financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorGrupoSchema
    }
  }
}

export const financeiroAnualSubgrupoRoutechema = {
  schema: {
    params: paramsAnualGrupoSchema,
    description: "Rota para obter o resumo mensal por subgrupo financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorSubGrupoSchema
    }
  }
}

export const financeiroMensalGrupoRouteSchema = {
  schema: {
    params: paramsMensalSchema,
    description: "Rota para obter o resumo mensal por grupo financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorGrupoSchema
    }
  }
}

export const financeiroMensalSubgrupoRouteSchema = {
  schema: {
    params: paramsMensalGrupoSchema,
    description: "Rota para obter o resumo mensal por subgrupo financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorSubGrupoSchema
    }
  }
}

export const financeiroAnualRubricaRouteSchema = {
  schema: {
    params: paramsAnualSubGrupoSchema,
    description: "Rota para obter o resumo anual por rubrica financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorRubricaSchema
    }
  }
}

export const financeiroMensalRubricaRouteSchema = {
  schema: {
    params: paramsMensalSubGrupoSchema,
    description: "Rota para obter o resumo mensal por subgrupo financeiro",
    tags: ["Financeiro"],
    response: {
      200: apiResponsePorRubricaSchema
    }
  }
}

export const financeiroResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    statusCode: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

export const financeiroResumoSchema = financeiroResponseSchema(
  z.array(
    z.object({
      id_grupo: z.string(),
      descricao: z.string(),
      orcado: z.number().nullable(),
      realizado: z.number().nullable(),
    }),
  ),
);

export const financeiroAnualResumoSchema = z.object({
  ano: z.coerce.number(),
  grupoId: z.string(),
});

export const financeiroTendenciaMensalSchema = financeiroResponseSchema(
  z.array(
    z.object({
      mes: z.coerce.number().min(1).max(12),
      orcado: z.coerce.number(),
      realizado: z.coerce.number(),
    }),
  ),
);

export const financeiroParamsMensalSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number().min(1).max(12)
});

export const financeiroParamsGrupoSchema = z.object({
  grupoId: z.coerce
    .string()
    .transform((val) => val.replace(/\D/g, "").padStart(2, "0")),
});

export const financeiroVariacaoSchema = financeiroResponseSchema(z.number());

export const financeiroExecucaoSchema = financeiroResponseSchema(z.number());
