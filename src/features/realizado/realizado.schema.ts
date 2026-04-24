import z from "zod";
import { paramsAnualSchema, paramsMensalSchema } from "../../schemas/paramsShema.js";
import { apiResposneTotalSchema } from "../../schemas/responseSchema.js";

export const realizadoAnualRouteSchema = {
  schema:{
   params: paramsAnualSchema,
      description: "Retorna o valor total realizado anual",
      tags: ["realizado"],
      response: {
        200: apiResposneTotalSchema,
      },
    },
  };

export const realizadoMensalRouteSchema = {
  schema: {
    params: paramsMensalSchema,
    description: "Retorna o valor total realizado mensal",
    tags: ["realizado"],
    response: {
      200: apiResposneTotalSchema
    }
  }
};