import { FastifyInstance } from "fastify";
import { clients } from "./sse.types.js";

export default async function orcadoRoutes(app: FastifyInstance) {
app.get("/downloadProcess/events", async (request, reply) => {
  const clientId = crypto.randomUUID();

  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });

  clients.set(clientId, {
    id: clientId,
    reply,
  });

  request.raw.on("close", () => {
    clients.delete(clientId);
  });
});
}