import z from "zod";

export const paramsAnualSchema = z.object({
  ano: z.coerce.number(),
});

export const paramsMensalSchema = paramsAnualSchema.extend({
    mes: z.coerce.number(),
  });

export const paramsGrupoSchema = z.object({
  id_grupo: z.string()
});

export const paramsSubGrupoSchema = paramsGrupoSchema.extend({
  id_subgrupo: z.string()
});

export const paramsAnualGrupoSchema = paramsAnualSchema.extend({
    id_grupo: z.string(),
  });

export const paramsMensalGrupoSchema = paramsMensalSchema.extend({
     id_grupo: z.string(),
  });

export const paramsAnualSubGrupoSchema = paramsAnualGrupoSchema.extend({
  id_subgrupo: z.string(),
});

export const paramsMensalSubGrupoSchema = paramsMensalGrupoSchema.extend({ 
  id_subgrupo: z.string(),
});

export const paramsAnualRubricaSchema = paramsAnualSubGrupoSchema.extend({
  id_rubrica: z.string(),
});

export const paramsMensalRubricaSchema = paramsMensalSubGrupoSchema.extend({
  id_rubrica: z.string(),
});

export type ParamsAnual = z.infer<typeof paramsAnualSchema>;
export type ParamsMensal = z.infer<typeof paramsMensalSchema>;

export type ParamsGrupo = z.infer<typeof paramsGrupoSchema>;
export type ParamsSubGrupo = z.infer<typeof paramsSubGrupoSchema>;

export type ParamsAnualGrupo = z.infer<typeof paramsAnualGrupoSchema>;
export type ParamsMensalGrupo = z.infer<typeof paramsMensalGrupoSchema>;
export type ParamsAnualSubGrupo = z.infer<typeof paramsAnualSubGrupoSchema>;
export type ParamsMensalSubGrupo = z.infer<typeof paramsMensalSubGrupoSchema>;
