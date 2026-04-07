import { z } from "zod";

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
      id: z.string(),
      descricao: z.string(),
      orcado: z.number().nullable(),
      realizado: z.number().nullable(),
    }),
  ),
);

export const financeiroVariacaoSchema = financeiroResponseSchema(
  z.number(),
);

export const financeiroExecucaoSchema = financeiroResponseSchema(
  z.number(), 
);
