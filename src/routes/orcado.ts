import { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { success } from "../utils/apiResponse.js";

import { OrcadoController } from "../features/orcado/orcado.controller.js";
import { OrcadoService } from "../features/orcado/orcado.service.js";
import { OrcadoRepository } from "../features/orcado/orcado.repository.js";
import { orcadoGrupoSchema, orcadoResponseSchema, orcadoTotalSchema } from "../features/orcado/orcado.schema.js";
import z from "zod";

import { financeiroParamsMensalSchema } from "../modulos/financeiro/financeiro.schema.js";
import { realizadoTotalSchema } from "../features/realizado/realizado.schema.js";

const orcadoRepository = new OrcadoRepository();
const orcadoService = new OrcadoService(orcadoRepository);
const orcadoController = new OrcadoController(orcadoService);

export default async function orcadoRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orcado",
    {
      schema: {
        description: "Retorna o valor total orçado",
        tags: ["Orcado"],
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
    "/orcado-mensal/:ano/:mes",
    {
      schema: {
        params: financeiroParamsMensalSchema,
        description: "Retorna o valor total orcado mensal",
        tags: ["Orcado"],
        response: {
          200: realizadoTotalSchema,
        },
      },
    },
    async (request, reply) => {
      const {ano, mes} = request.params;
      const result = await orcadoController.getOrcadoMensal(ano, mes);
      return reply.send(result)
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
