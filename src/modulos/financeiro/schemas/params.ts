import z from "zod";

export const financeiroParamsAnoSchema = z.object({
  ano: z.coerce.number()
});

export const financeiroParamsMensalSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number()
});

export const financeiroParamsAnoGrupolSchema = z.object({
  ano: z.coerce.number(),
  grupoId: z.string()
});

export const financeiroParamsGrupoSchema = z.object({
  grupoId: z.string()
});