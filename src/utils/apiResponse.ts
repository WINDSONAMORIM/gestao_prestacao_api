import { ResponseAPI } from "../types/responseAPI.js";

export function success<T>(data: T, message: string = "Sucesso"): ResponseAPI<T> {
  return {
    statusCode: 200,
    success: true,
    message,
    data,
  };
}

export function error(message: string, statusCode = 500): ResponseAPI {
  return {
    statusCode,
    success: false,
    message,
    data: undefined,
  };
}
