import z from "zod";

export const financeiroResponseSchemaDTO = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    statusCode: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
  });