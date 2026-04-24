import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { success } from "../../utils/apiResponse.js";

import { orcadoAnualRouteSchema, orcadoMensalRouteSchema } from "./orcado.schema.js";
import { orcadoController } from "./orcado.container.js";

export default async function orcadoRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orcado-anual/:ano",
    orcadoAnualRouteSchema,
    async (request, reply) => {
      const result = await orcadoController.getTotalOrcado(request.params)
      return reply.send(success(result));
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/orcado-mensal/:ano/:mes",
    orcadoMensalRouteSchema,
    async (request, reply) => {
      const result = await orcadoController.getOrcadoMensal(request.params);
      return reply.send(success(result))
    },
  );  
}
