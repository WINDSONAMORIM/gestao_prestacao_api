import { paramsAnualSchema, paramsMensalSchema } from "../../schemas/paramsShema.js";
import { apiResposneTotalSchema } from "../../schemas/responseSchema.js";

export const orcadoAnualRouteSchema = {
  schema: {
    params: paramsAnualSchema,
    description: "Retorna o valor total orçado anual",
    tags: ["Orcado"],
    response: {
      200: apiResposneTotalSchema,
    },
  },
};

export const orcadoMensalRouteSchema = {
  schema: {
    params: paramsMensalSchema,
    description: "Retorna o valor total orcado mensal",
    tags: ["Orcado"],
    response: {
      200: apiResposneTotalSchema
    }
  }
};

// export const orcadoParamsAnoSchema = z.object({
//   ano: z.coerce.number()
// // });

// export const orcadoResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
//   z.object({
//     statusCode: z.number(),
//     success: z.boolean(),
//     message: z.string(),
//     data: dataSchema,
//   });

// export const orcadoTotalSchema = 
//   z.object({
//     total: z.number(),
//   })

// export const orcadoGrupoSchema = orcadoResponseSchema(
//   z.array(
//     z.object({
//       id: z.string(),
//       descricao: z.string(),
//     })
//   )
// );

// export const apiResponseTotalSchema = z.object({
//   statusCode: z.number(),
//   success: z.boolean(),
//   message: z.string(),
//   data: orcadoTotalSchema
// });

