import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify();

app.listen({ port: (Number(process.env.PORT) || 8080) }).then(() => {
  console.log("🚀 Server rodando em http://localhost:" + (process.env.PORT || 8080));
});
