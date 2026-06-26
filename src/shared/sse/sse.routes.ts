import { FastifyInstance } from "fastify";
import { clients } from "./sse.types.js";

export default async function sseRoutes(app: FastifyInstance ) {
  app.options("/downloadProcess/events", (req, reply) => {
    reply
      .header("Access-Control-Allow-Origin", req.headers.origin || "*")
      .header("Access-Control-Allow-Methods", "GET, OPTIONS")
      .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
      .header("Access-Control-Allow-Credentials", "true")
      .send();
  });

  app.get("/downloadProcess/events", (request, reply) => {
    // Adicionar os cabeçalhos CORS aqui também
    reply
      .header("Access-Control-Allow-Origin", request.headers.origin || "*")
      .header("Access-Control-Allow-Methods", "GET, OPTIONS")
      .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
      .header("Access-Control-Allow-Credentials", "true");

    const clientId = crypto.randomUUID();
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    reply.raw.flushHeaders();
    reply.hijack();

    const send = (event: string, data: any) => {
      reply.raw.write(
        `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
      );
    };

    send("connected", { clientId, connected: true });
    clients.set(clientId, { id: clientId, write: send, reply });

    request.raw.on("close", () => {
      clients.delete(clientId);
      console.log("Cliente SSE desconectado:", clientId);
    });
  });
}