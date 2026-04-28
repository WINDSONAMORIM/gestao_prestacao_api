import z from "zod";

export const responseTotalSchema = z.object({
  total: z.coerce.number(),
});

export const responsePorGrupoSchema = z.object({
  id_grupo: z.string(),
  descricao: z.string(),
  orcado: z.coerce.number(),
  realizado: z.coerce.number(),
});

export const responsePorSubGrupoSchema = z.object({
  id_subgrupo: z.string(),
  descricao: z.string(),
  id_grupo: z.string(),
  orcado: z.coerce.number(),
  realizado: z.coerce.number(),
});

export const responsePorRubricaSchema = z.object({
  id_rubrica: z.string(),
  id_subgrupo: z.string(),
  descricao: z.string(),
  id_grupo: z.string(),
  orcado: z.coerce.number(),
  realizado: z.coerce.number(),
});

export const responseTendenciaMensalSchema = z.object({
  mes: z.coerce.number().min(1).max(12),
  orcado: z.number(),
  realizado: z.number(),
});

export const responseTopExcedeOrcadoScheme = z.object({
  id_grupo: z.string(),
  orcado: z.number(),
  realizado: z.number(),
  diferenca: z.number(),
  perc: z.coerce.number(),
})

export const apiResposneTotalSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: responseTotalSchema,
});

export const apiResponsePorGrupoSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responsePorGrupoSchema),
});

export const apiResponsePorSubGrupoSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responsePorSubGrupoSchema),
});

export const apiResponsePorRubricaSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responsePorRubricaSchema),
});

export const apiResponseTendenciaMensalSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responseTendenciaMensalSchema),
});

export const apiResponseTopExcedeOrcadoSchema = z.object({
 statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responseTopExcedeOrcadoScheme),
})

export type ResponseTotal = z.infer<typeof responseTotalSchema>;

export type ResponseAnaliseOrcamentariaAnualPorGrupo = z.infer<
  typeof responsePorGrupoSchema
>;

export type ResponseAnaliseOrcamentariaAnualPorSubGrupo = z.infer<
  typeof responsePorSubGrupoSchema
>;

export type ResponseAnaliseOrcamentariaAnualPorRubrica = z.infer<
  typeof responsePorRubricaSchema
>;

export type ResponseTendenciaMensal = z.infer<
  typeof responseTendenciaMensalSchema
>;

export type ResponseTopExcedeOrcado = z.infer<
  typeof responseTopExcedeOrcadoScheme
>; 