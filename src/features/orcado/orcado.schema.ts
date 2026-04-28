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