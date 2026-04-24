import z from "zod";

export const paramsAnualSchema = z.object({
  ano: z.coerce.number()
});

export const paramsMensalSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number()
});

export const paramsAnualGrupoSchema = z.object({
  ano: z.coerce.number(),
  id_grupo: z.string()
});

export const paramsMensalGrupoSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number(),
  id_grupo: z.string()
});

export const paramsAnualSubGrupoSchema = z.object({
  ano: z.coerce.number(),
  id_grupo: z.string(),
  id_subgrupo: z.string()
});

export const paramsMensalSubGrupoSchema = z.object({
  ano: z.coerce.number(),
  mes: z.coerce.number(),
  id_grupo: z.string(),
  id_subgrupo: z.string()
});

export type ParamsAnual = z.infer<typeof paramsAnualSchema>;
export type ParamsMensal = z.infer<typeof paramsMensalSchema>;
export type ParamsAnualGrupo = z.infer<typeof paramsAnualGrupoSchema>;
export type ParamsMensalGrupo = z.infer<typeof paramsMensalGrupoSchema>;
export type ParamsAnualSubGrupo = z.infer<typeof paramsAnualSubGrupoSchema>;
export type ParamsMensalSubGrupo = z.infer<typeof paramsMensalSubGrupoSchema>;

// export const paramsGrupoSchema = z.object({
//   id_grupo: z.string()
// });
