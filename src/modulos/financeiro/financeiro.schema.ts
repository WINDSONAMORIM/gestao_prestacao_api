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

export const financeiroAnualResumoSchema = z.object({
      ano: z.coerce.number(),
      grupoId: z.string(),
    });

export const financeiroTendenciaMensalSchema = financeiroResponseSchema(
  z.array(
    z.object({
      mes: z.coerce.number().min(1).max(12),
      orcado: z.number(),
      realizado: z.number(),
    }),
  ),
);

// export const financeiroParamsAnoSchema = z.object({
//   ano: z.coerce.number()
// });

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
