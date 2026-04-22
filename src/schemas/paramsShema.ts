import z from "zod";

export const paramsAnoSchema = z.object({
  ano: z.coerce.number()
});

export const paramsMensalSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number()
});

export type ParamsMensal = z.infer<typeof paramsMensalSchema>;

export const paramsGrupoSchema = z.object({
  grupoId: z.string()
});

export const paramsAnoGrupolSchema = z.object({
  ano: z.coerce.number(),
  grupoId: z.string()
});
