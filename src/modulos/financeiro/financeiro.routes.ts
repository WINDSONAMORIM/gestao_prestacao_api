import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FinanceiroController } from "./financeiro.controller.js";
import { FinanceiroRepository } from "./financeiro.repository.js";
import { FinanceiroService } from "./financeiro.service.js";
import {
  financeiroAnualResumoSchema,
  financeiroExecucaoSchema,
  financeiroParamsAnoSchema,
  financeiroParamsGrupoSchema,
  financeiroParamsMensalSchema,
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
    "/financeiro/resumo-anual-grupo/:ano",
    {
      schema: {
        params: financeiroParamsAnoSchema,
        description: "Rota para obter o resumo anual por grupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema,
        },
      },
    },
    async (request, reply) => {
      const { ano } = request.params
      const result = await financeiroController.getResumoAnualPorGrupo(ano) 
      return reply.send(result);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-mensal-grupo/:ano/:mes",
    {
      schema: {
        params: financeiroParamsMensalSchema,
        description: "Rota para obter o resumo mensal por grupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema,
        },
      },
    },
    async (request, reply) => {
      const { ano, mes } = request.params
      const result = await financeiroController.getResumoMensalPorGrupo(ano, mes) 
      return reply.send(result);
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-anual-subgrupo/:ano/:grupoId",
    {
      schema: {
        params: financeiroAnualResumoSchema,
        description: "Rota para obter o resumo anual por subgrupo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema,
        },
      },
    },
    async (request, reply) => {
      const { ano, grupoId } = request.params;
      console.log(request.params);
      console.log(`Rota Ano: ${ano} Grupo: ${grupoId}`)
      const result = await financeiroController.getResumoAnualPorSubGrupo(ano, grupoId);

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
