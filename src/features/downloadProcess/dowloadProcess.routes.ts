import { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { DownloadProcessController } from "./dowloadProcess.controller.js";
import { DownloadProcessService } from "./dowloadProcess.service.js";


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
        console.log("Rota downloadProcess-preview: " + JSON.stringify(result, null, 2));
        return reply.send(result);
      } catch (error: any) {
        console.error("Erro na rota downloadProcess-preview:", error);
        return reply
          .status(500)
          .send({ error: "Erro ao preencher a planilha" });
      }
    },
  );
}
        
