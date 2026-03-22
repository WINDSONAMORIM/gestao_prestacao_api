import Fastify from "fastify";
import swagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import dotenv from "dotenv";

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { AppError } from "./utils/appError.js";
import { error } from "./utils/apiResponse.js";

dotenv.config();
const app = Fastify();

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

app.register(import("./routes/orcado.js"));

app.setErrorHandler((err, request, reply) => {
  if (err instanceof AppError) {
    return reply
      .status(err.statusCode)
      .send(error(err.message, err.statusCode));
  }
  console.error(err);
  return reply.status(500).send(error("Erro Interno do Servidor", 500));
});

app.listen({ port: Number(process.env.PORT) || 8080 }).then(() => {
  console.log(
    "🚀 Server rodando em http://localhost:" + (process.env.PORT || 8080),
  );
});
