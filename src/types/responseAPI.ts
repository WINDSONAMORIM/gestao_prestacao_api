import { ZodError } from "zod";

export interface ResponseAPI<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const ok = <T>(data: T, message = "OK"): ResponseAPI<T> => ({
  statusCode: 200,
  success: true,
  message,
  data,
});

export const badRequest = <T = null>(
  message = "Requisição inválida",
  data: T = null as T,
): ResponseAPI<T> => ({
  statusCode: 400,
  success: false,
  message,
  data,
});

export const isValidationError = (err: unknown): err is { validation: any } => {
  return typeof err === "object" && err !== null && "validation" in err;
};

export const isZodError = (err: unknown): err is ZodError => {
  return err instanceof ZodError;
};

export const isResponseSerializationError = (
  err: unknown,
): err is { code: string; cause?: unknown } => {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "FST_ERR_REP_SERIALIZATION"
  );
};
