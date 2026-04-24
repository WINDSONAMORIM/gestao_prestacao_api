import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  financeiroAnualGrupoRouteSchema,
  financeiroAnualSubgrupoRoutechema,
  financeiroExecucaoSchema,
  financeiroMensalGrupoRouteSchema,
  financeiroMensalSubgrupoRouteSchema,
  financeiroParamsGrupoSchema,
  financeiroTendenciaMensalSchema,
  financeiroVariacaoSchema,
} from "./financeiro.schema.js";
import {
  excedenteAnualResponse,
  financeiroResumoResponseGrupo,
  financeiroResumoResponseSubgrupo,
} from "./schemas/response.js";
import { financeiroParamsAnoSchema, financeiroParamsMensalSchema } from "./schemas/params.js";
import { apiErrorResponseSchema } from "./schemas/error.js";
import { financeiroController } from "./financeiro.container.js";
import { success } from "../../utils/apiResponse.js";


export default async function financeiroRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-anual-grupo/:ano",
    financeiroAnualGrupoRouteSchema,
    async (request, reply) => {
      const result = await financeiroController.getResumoAnualPorGrupo(request.params);
      return reply.send(success(result));
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-mensal-grupo/:ano/:mes",
    financeiroMensalGrupoRouteSchema,
    async (request, reply) => {
      const result = await financeiroController.getResumoMensalPorGrupo(request.params);
      return reply.send(success(result));
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-anual-subgrupo/:ano/:id_grupo",
    financeiroAnualSubgrupoRoutechema,
    async (request, reply) => {
      const result = await financeiroController.getResumoAnualPorSubGrupo(request.params);
      return reply.send(success(result));
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-mensal-subgrupo/:ano/:mes/:id_grupo",
    financeiroMensalSubgrupoRouteSchema,
    async (request, reply) => {
      console.log(request.params);
      const result = await financeiroController.getResumoMensalPorSubGrupo(request.params)
      return reply.send(success(result))
    }
  )

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

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/top-anual-excede-orcado/:ano",
    {
      schema: {
        params: financeiroParamsAnoSchema,
        description:
          "Rota para obter os grupos que mais excederam o orçamento anual",
        tags: ["Financeiro"],
        response: {
          200: excedenteAnualResponse,
          400: apiErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { ano } = request.params;
      const result = await financeiroController.getTopAnualExcedeOrcado(ano);
      return reply.send(result);
    },
  );
}
