import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FinanceiroController } from "./financeiro.controller.js";
import { FinanceiroRepository } from "./financeiro.repository.js";
import { FinanceiroService } from "./financeiro.service.js";
import {
  financeiroExecucaoSchema,
  financeiroParamsGrupoSchema,
  financeiroResumoSchema,
  financeiroTendenciaMensalSchema,
  financeiroVariacaoSchema,
} from "./financeiro.schema.js";
import z from "zod";

const financeiroRepository = new FinanceiroRepository();
const financeiroService = new FinanceiroService(financeiroRepository);
const financeiroController = new FinanceiroController(financeiroService);

export default async function financeiroRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-grupo",
    {
      schema: {
        description: "Rota para obter o resumo por grupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema,
        },
      },
    },
    async () => {
      return financeiroController.getResumoPorGrupo();
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-subgrupo/:grupoId",
    {
      schema: {
        params: financeiroParamsGrupoSchema,
        description: "Rota para obter o resumo por subgrupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema,
        },
      },
    },
    async (request, reply) => {
      const { grupoId } = request.params;
      const result = await financeiroController.getResumoPorSubGrupo(grupoId);

      return reply.send(result);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/tendencia-mensal/:grupoId?",
    {
      schema: {
        params: financeiroParamsGrupoSchema,
        description: "Rota para obter a tendência mensal por grupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroTendenciaMensalSchema,
        },
      },
    },
    async (request, reply) => {
      const { grupoId } = request.params;
      const result =
        await financeiroController.getTendenciaMensalPorGrupo(grupoId);

      return reply.send(result);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/variacao",
    {
      schema: {
        description: "Rota para obter a variação entre orçado e realizado",
        tags: ["Financeiro"],
        response: {
          200: financeiroVariacaoSchema,
        },
      },
    },
    async () => {
      return financeiroController.getVariacaoOrcadoRealizado();
    },
  );
  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/execucao",
    {
      schema: {
        description: "Rota para obter a execução entre orçado e realizado",
        tags: ["Financeiro"],
        response: {
          200: financeiroExecucaoSchema,
        },
      },
    },
    async () => {
      return financeiroController.getExecucaoOrcadoRealizado();
    },
  );
}
