import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { success } from "../../utils/apiResponse.js";

import { realizadoAnualRouteSchema, realizadoMensalRouteSchema } from "./realizado.schema.js";
import { realizadoController } from "./realizado.container.js";

export default async function realizadoRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/realizado-anual/:ano",
        realizadoAnualRouteSchema,
        async (request, reply) => {
            const result = await realizadoController.getTotalRealizado(request.params)
            return reply.send(success(result));
        }
    );

    app.withTypeProvider<ZodTypeProvider>().get(
        "/realizado-mensal/:ano/:mes",
        realizadoMensalRouteSchema,
        async (request, reply) => {
            const result = await realizadoController.getRealizadoMensal(request.params);
            return reply.send(success(result))
        }
    )
}