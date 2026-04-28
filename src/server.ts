import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import dotenv from "dotenv";
import cors from "@fastify/cors";

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { errorHandler } from "./utils/erroHandler.js";

dotenv.config();
const app = Fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(swagger, {
  openapi: {
    info: {
      title: "API de Gestão de Prestação de Contas",
      version: "1.0.0",
      description:
        "API para gerenciamento de prestação de contas, incluindo orçamentos, despesas e receitas.",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
});

app.register(import("./features/orcado/orcado.routes.js"));
app.register(import("./features/realizado/realizado.routes.js"));
app.register(import("./features/resumoFinanceiro/resumoFinanceiro.routes.js"));
app.register(import("./features/tendencia/tendencia.routes.js"))
app.register(import("./features/analytics/analytics.routes.js"))

await errorHandler(app);

const start = async () => {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.listen({
      port,
      host: '0.0.0.0'
    });
    console.log(`Server listening on http://0.0.0.0:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// app.listen({ port: Number(process.env.PORT) || 8080 }).then(() => {
//   console.log(
//     "🚀 Server rodando em http://localhost:" + (process.env.PORT || 8080),
//   );
// });
