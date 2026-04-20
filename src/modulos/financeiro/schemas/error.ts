import { z } from "zod";
import { financeiroResponseSchemaDTO } from "./dto.js";

export const apiErrorResponseSchema = financeiroResponseSchemaDTO(
  z.array(
    z.object({
    path: z.string().optional(),
    message: z.string(),
    code: z.string().optional(),
  }),
).optional()
);

// export const apiErrorResponseSchema = z.object({
//   statusCode: z.number(),
//   success: z.literal(false),
//   message: z.string(),
//   data: z.array(errorDetailSchema).optional(), // Tipado e opcional
// });
