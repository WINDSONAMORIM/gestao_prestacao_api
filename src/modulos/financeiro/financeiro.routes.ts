import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FinanceiroController } from "./financeiro.controller.js";
import { FinanceiroRepository } from "./financeiro.repository.js";
import { FinanceiroService } from "./financeiro.service.js";
import { financeiroExecucaoSchema, financeiroResumoSchema, financeiroVariacaoSchema } from "./financeiro.schema.js";

const financeiroRepository = new FinanceiroRepository();
const financeiroService = new FinanceiroService(financeiroRepository);
const financeiroController = new FinanceiroController(financeiroService);

export default async function financeiroRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro",
    {
      schema: {
        description: "Rota de exemplo para o módulo financeiro",
        tags: ["Financeiro"],
        response: {
          200: financeiroResumoSchema
        },
      },
    },
    async () => {
      return financeiroController.getResumoPorGrupo();
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/financeiro/variacao",
    {
      schema: {
        description: "Rota para obter a variação entre orçado e realizado",
        tags: ["Financeiro"],
        response: {
          200: financeiroVariacaoSchema
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
          200: financeiroExecucaoSchema
        },
      },
    },
    async () => {
      return financeiroController.getExecucaoOrcadoRealizado();
    },
  );

}
