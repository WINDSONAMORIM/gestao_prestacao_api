import { z } from "zod";

export const orcadoResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

export const orcadoTotalSchema = orcadoResponseSchema(
  z.object({
    total: z.number(),
  }),
);
