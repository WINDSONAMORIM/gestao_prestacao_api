import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { success } from "../utils/apiResponse.js";

import { OrcadoController } from "../features/orcado/orcado.controller.js";
import { OrcadoService } from "../features/orcado/orcado.service.js";
import { OrcadoRepository } from "../features/orcado/orcado.repository.js";
import { orcadoResponseSchema, orcadoTotalSchema } from "../features/orcado/orcado.schema.js";

const orcadoRepository = new OrcadoRepository();
const orcadoService = new OrcadoService(orcadoRepository);
const orcadoController = new OrcadoController(orcadoService);

export default async function orcadoRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orcado",
    {
      schema: {
        description: "Retorna o valor total orçado",
        tags: ["Orçado"],
        response: {
          200: orcadoTotalSchema,
        },
      },
    },
    async () => {
      return orcadoController.getTotalOrcado();
    },
  );
}
