import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { success } from "../../utils/apiResponse.js";

import { tendenciaGrupoRouteSchema, tendenciaSubGrupoRouteSchema } from "./tendencia.schema.js";
import { tendenciaController } from "./tendencia.container.js";


export default async function tendenciaRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/tendencia/:id_grupo?",
        tendenciaGrupoRouteSchema,
        async (request, reply) => {
            const result = await tendenciaController.getTendenciaMensalPorGrupo(request.params);

            return reply.send(success(result));
        },
    );

    app.withTypeProvider<ZodTypeProvider>().get(
        "/tendencia/:id_grupo/:id_subgrupo",
        tendenciaSubGrupoRouteSchema,
        async (request, reply) => {
            const result = await tendenciaController.getTendenciaMensalPorSubGrupo(request.params);

            return reply.send(success(result));
        },
    );
}