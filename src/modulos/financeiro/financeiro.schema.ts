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

export const financeiroTendenciaMensalSchema = financeiroResponseSchema(
  z.array(
    z.object({
      mes: z.string(),
      orcado: z.number(),
      realizado: z.number(),
    }),
  ),
);

export const financeiroParamsGrupoSchema = z.object({
  grupoId: z.coerce
    .string()
    .transform((val) => val.replace(/\D/g, "").padStart(2, "0")),
});

export const financeiroVariacaoSchema = financeiroResponseSchema(z.number());

export const financeiroExecucaoSchema = financeiroResponseSchema(z.number());
