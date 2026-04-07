import z from "zod";

export const realizadoResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

export const realizadoTotalSchema = realizadoResponseSchema(
  z.object({
    total: z.number(),
  }),
);