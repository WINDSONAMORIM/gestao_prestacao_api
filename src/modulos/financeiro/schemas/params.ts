import z from "zod";

export const financeiroParamsAnoSchema = z.object({
  ano: z.coerce.number()
});

export const financeiroParamsMensalSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number()
});

export const financeiroParamsGrupoSchema = z.object({
  grupoId: z.string()
});