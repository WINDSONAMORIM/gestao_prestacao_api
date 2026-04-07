import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { realizadoTotalSchema } from "../features/realizado/realizado.schema.js";

import { RealizadoRepository } from "../features/realizado/realizado.repository.js";
import { RealizadoService } from "../features/realizado/realizado.service.js";
import { RealizadoController } from "../features/realizado/realizado.controller.js";

const realizadoRepository = new RealizadoRepository();
const realizadoService = new RealizadoService(realizadoRepository);
const realizadoController = new RealizadoController(realizadoService);

export default async function realizadoRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/realizado",
        {
            schema: {
                description: "Retorna o valor total realizado",
                tags: ["Realizado"],
                response: {
                    200: realizadoTotalSchema,
                },
            },
        },
        async () => {
            return realizadoController.getTotalRealizado();
        }
    );
}