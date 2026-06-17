import { FastifyInstance } from "fastify";
import { clients } from "./sse.types.js";

export default async function sseRoutes(app: FastifyInstance) {
app.get("/downloadProcess/events", async (request, reply) => {
  const clientId = crypto.randomUUID();

  reply.header("Content-Type", "text/event-stream");
  reply.header("Cache-Control", "no-cache");
  reply.header("Connection", "keep-alive");

  reply.raw.flushHeaders();

  reply.raw.write(
      `data: ${JSON.stringify({
        connected: true,
        clientId,
      })}\n\n`
    );

  clients.set(clientId, {
    id: clientId,
    reply,
  });

  request.raw.on("close", () => {
    clients.delete(clientId);
    console.log(`Cliente ${clientId} desconectado`);
  });
});
}