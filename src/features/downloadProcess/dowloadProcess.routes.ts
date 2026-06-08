import { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { DownloadProcessController } from "./dowloadProcess.controller.js";
import { DownloadProcessService } from "./dowloadProcess.service.js";
import { processosSchema } from "../../clients/myFlux/myFlux.schema.js";

const controller = new DownloadProcessController(new DownloadProcessService());

export default async function downloadProcessRouter(app: FastifyInstance) {
  await app.register(fastifyMultipart);
  app.withTypeProvider<ZodTypeProvider>().post(
    "/downloadProcess-preview",
    {
      schema: {
        description: "Rota para preencher a planilha de download dos processos",
        tags: ["downloadProcess"],
      },
    },
    async (request, reply) => {
      try {
        const file = await request.file();
        if (!file) {
          return reply
            .status(400)
            .send({ error: "Arquivo não fornecido" });
        }
        const buffer = await file.toBuffer();
        const result = await controller.fillOutWorksheet(
          buffer,
        );
        return reply.send(result);
      } catch (error: any) {
        console.error("Erro na rota downloadProcess-preview:", error);
        return reply
          .status(500)
          .send({ error: "Erro ao preencher a planilha" });
      }
    },
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/downloadProcess",
    {
      schema: {
        body: processosSchema,
        description: "Rota para fazer download dos processos",
        tags: ["downloadProcess"],
        security: [{
          bearerAuth: [],
        }
        ]
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

        const result = await controller.downloaderProcesses(request.body, token);

        return reply.send(result);
      } catch (error: any) {
        console.error("Erro na rota downloadProcess:", error);
        return reply
          .status(500)
          .send({ error: "Erro ao fazer o dowload" });
      }
    },
  );
}

