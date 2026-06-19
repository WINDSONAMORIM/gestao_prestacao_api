import { clients } from "./sse.types.js";

export function sendProgress(
  processoId: string,
  status: string
) {
  for (const client of clients.values()) {
    console.log(
      `For Service SSE SEND_PROGRESS -> processo=${processoId} status=${status}`
    );

    client.reply.raw.write(
      `data: ${JSON.stringify({
        processoId,
        status,
      })}\n\n`
    );
  }
}