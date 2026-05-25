import z from "zod";

export const loginSchema = z.object({
    username : z.email(),
    password : z.string()
})

export const processoSchema = z.object({
    title : z.coerce.number(),
})

export type ParammsLogin = z.infer<typeof loginSchema>;
export type ParamsGetTitle = z.infer<typeof processoSchema>