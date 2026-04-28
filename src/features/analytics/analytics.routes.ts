import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { success } from "../../utils/apiResponse.js";

import { analyticsController } from "./analytics.container.js";
import { analyticsRouteSchema } from "./analytics.schema.js";

export default async function analyticsRouter(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/financeiro/top-anual-excede-orcado/:ano",
        analyticsRouteSchema,
        async (request, reply) => {
            const result = await analyticsController.getTopAnualExcedeOrcado(request.params);
            return reply.send(success(result));
        },
    );
}

//   app.withTypeProvider<ZodTypeProvider>().get(
//     "/financeiro/variacao",
//     {
//       schema: {
//         description: "Rota para obter a variação entre orçado e realizado",
//         tags: ["Financeiro"],
//         response: {
//           200: financeiroVariacaoSchema,
//         },
//       },
//     },
//     async () => {
//       return financeiroController.getVariacaoOrcadoRealizado();
//     },
//   );

//   app.withTypeProvider<ZodTypeProvider>().get(
//     "/financeiro/execucao",
//     {
//       schema: {
//         description: "Rota para obter a execução entre orçado e realizado",
//         tags: ["Financeiro"],
//         response: {
//           200: financeiroExecucaoSchema,
//         },
//       },
//     },
//     async () => {
//       return financeiroController.getExecucaoOrcadoRealizado();
//     },
//   );

