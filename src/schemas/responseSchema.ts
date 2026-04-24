import z from "zod";

export const responseTotalSchema = z.object({
  total: z.coerce.number()
});

export const responsePorGrupoSchema = z.object({
  id_grupo: z.string(),
  descricao: z.string(),
  orcado: z.coerce.number(),
  realizado: z.coerce.number()
})

export const responsePorSubGrupoSchema = z.object({
  id_subgrupo: z.string(),
  descricao: z.string(),
  id_grupo: z.string(),
  orcado: z.coerce.number(),
  realizado: z.coerce.number()
})

export const apiResposneTotalSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: responseTotalSchema
})

export const apiResponsePorGrupoSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responsePorGrupoSchema)
})

export const apiResponsePorSubGrupoSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: z.array(responsePorSubGrupoSchema)
})

export type ResponseTotal = z.infer<typeof responseTotalSchema>;
export type ResponseAnaliseOrcamentariaAnualPorGrupo = z.infer<typeof responsePorGrupoSchema>
export type ResponseAnaliseOrcamentariaAnualPorSubGrupo = z.infer<typeof responsePorSubGrupoSchema>