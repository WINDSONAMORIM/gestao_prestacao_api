import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { MyFluxRepository } from "./myFlux.repository.js";
import { MyfluxService } from "./myFlux.service.js";
import { MyfluxController } from "./myFlux.controller.js";
import { myFluxLoginRouteSchema, processoSchema } from "./myFlux.schema.js";
import { success } from "../../utils/apiResponse.js";

const repository = new MyFluxRepository();
const service = new MyfluxService(repository);
const controller = new MyfluxController(service);

export default async function myFluxRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/myFlux-login",
    myFluxLoginRouteSchema,
    async (request, reply) => {
      console.log("rota: " + request.body);
      const result = await controller.login(request.body);
      return reply.send(success(result));
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/myFlux-getTitle",
    {
      schema: {
        querystring: processoSchema,
        description: "Rota para obter o Titulo do processo",
        tags: ["myflux"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    async (request, reply) => {
      try {
        const authHeader = request.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return reply
            .status(401)
            .send({ error: "Token de autorização não fornecido ou inválido" });
        }

        const token = authHeader.split(" ")[1];

        console.log(request.query);

        const result = await controller.getTitle(request.query, token);
        
        return reply.send(result);
      } catch (error: any) {
        console.error("Erro na rota getTitle:", error);
        return reply
          .status(500)
          .send({ error: error.message || "Erro interno do servidor" });
      }
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/myFlux-empacotar/:id",
    {
      schema:{
        params: processoSchema,
        description:"Rota para empacotar o processo",
        tags:["myflux"],
        security:[
          {
            bearerAuth:[],
          },
        ],
      },
    },
    async (request, reply) => {
      try {
        const authHeader = request.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return reply
            .status(401)
            .send({ error: "Token de autorização não fornecido ou inválido" });
        }

        const token = authHeader.split(" ")[1];

        const {id} = request.params;

        const result = await controller.downloaderProcess(id, token);
        // console.log(`route empacotar params ${id}`)
        // console.log(`route empacotar ${result}`)
        return reply.send(result)
      } catch (error: any) {
         console.error("Erro na rota empacotar:", error);
        return reply
          .status(500)
          .send({ error: error.message || "Erro interno do servidor" });
      }
    }
  )
}
