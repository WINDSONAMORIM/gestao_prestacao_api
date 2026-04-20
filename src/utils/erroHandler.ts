import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../utils/appError.js";
import {
  isResponseSerializationError,
  isValidationError,
} from "../types/responseAPI.js";
import { error } from "../utils/apiResponse.js";

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, request, reply) => {
    // 🔹 Erro controlado (seu)
    if (err instanceof AppError) {
      return reply
        .status(err.statusCode)
        .send(error(err.message, err.statusCode));
    }

    // 🔹 Erro do Zod (entrada inválida)
    if (err instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        success: false,
        message: "ZOD - Erro de validação",
        data: err.issues, // 👈 aqui vai aparecer
      });
    }

    // 🔹 Erro de validação do Fastify (params/query/body)
    if (isValidationError(err)) {
      const issues =
        err.validation?.map((issue: any) => ({
          path: issue.instancePath?.replace("/", ""),
          message: issue.message,
          code: issue.keyword,
        })) ?? [];

      return reply.status(400).send({
        statusCode: 400,
        success: false,
        message: "Fastify - Erro de validação",
        data: issues,
      });
    }

    // 🔹 Erro de serialização (RESPOSTA não bate com schema)
    if (isResponseSerializationError(err)) {
      const cause = (err as any).cause;

      if (cause instanceof ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          success: false,
          message: "Erro na resposta da API",
          data: cause.issues, // 👈 AQUI estava o seu problema antes
        });
      }

      return reply.status(500).send(error("Erro ao serializar resposta"));
    }

    // 🔹 Fallback
    console.error(err);

    return reply.status(500).send(error("Erro interno do servidor"));
  });
}
