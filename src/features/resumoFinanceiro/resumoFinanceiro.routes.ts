import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  financeiroAnualGrupoRouteSchema,
  financeiroAnualRubricaRouteSchema,
  financeiroAnualSubgrupoRoutechema,
  financeiroMensalGrupoRouteSchema,
  financeiroMensalRubricaRouteSchema,
  financeiroMensalSubgrupoRouteSchema,
} from "./resumoFinanceiro.schema.js";

import { financeiroController } from "./resumoFinanceiro.container.js";
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
      const result = await financeiroController.getResumoMensalPorSubGrupo(request.params)
      return reply.send(success(result))
    }
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-anual-rubrica/:ano/:mes/:id_grupo/:id_subgrupo",
    financeiroAnualRubricaRouteSchema,
    async (request, reply) => {
      const result = await financeiroController.getResumoAnualPorRubrica(request.params)
      return reply.send(success(result))
    }
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/resumo-mensal-rubrica/:ano/:mes/:id_grupo/:id_rubrica",
    financeiroMensalRubricaRouteSchema,
    async (request, reply) => {
      const result = await financeiroController.getResumoMensalPorRubrica(request.params)
      return reply.send(success(result))
    }
  )
}
