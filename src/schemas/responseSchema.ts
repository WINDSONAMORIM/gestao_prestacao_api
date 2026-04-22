import z from "zod";

export const responseTotalSchema = z.object({
  total: z.coerce.number()
});

export type ResponseTotal = z.infer<typeof responseTotalSchema>;