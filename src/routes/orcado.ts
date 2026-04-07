import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { success } from "../utils/apiResponse.js";

import { OrcadoController } from "../features/orcado/orcado.controller.js";
import { OrcadoService } from "../features/orcado/orcado.service.js";
import { OrcadoRepository } from "../features/orcado/orcado.repository.js";
import { orcadoGrupoSchema, orcadoResponseSchema, orcadoTotalSchema } from "../features/orcado/orcado.schema.js";
import z from "zod";

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

  app.withTypeProvider<ZodTypeProvider>().get(
    "/grupo",
    {
      schema: {
        description: "Retorna os grupos",
        tags: ["Grupo"],
        response: {
          200: orcadoGrupoSchema,
        },
      },
    },
    async () => {
      return orcadoController.getGrupo();
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/orcado/grupo/:grupo",
    {
      schema: {
        description: "Retorna o valor orçado para um grupo específico",
        tags: ["Orçado"],
        params: z.object({
          grupo: z.string(),
        }),
        response: {
          200: orcadoTotalSchema,
        },
      },
    },
    async (req) => {
      const { grupo } = req.params;
      return orcadoController.getOrcadoByGrupo(grupo);
    },
  );  
}
