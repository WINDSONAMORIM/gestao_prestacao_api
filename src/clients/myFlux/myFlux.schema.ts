import z from "zod";

export const myFluxLoginSchema = z.object({
    username: z.email(),
    password: z.string()
})

export const responsemyFluxLoginSchema = z.object({
  token: z.string(),
});

export const apiResposneMyFluxLogin = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  message: z.string(),
  data: responsemyFluxLoginSchema,
});

export const myFluxLoginRouteSchema = {
    schema: {
        body: myFluxLoginSchema,
        description: "Rota login myflux",
        tags: ["myflux"],
        response:{
            200: apiResposneMyFluxLogin
        }
    },
}

export const processoSchema = z.object({
    id: z.coerce.number(),
})

export const processosSchema = z.array(z.number())

export type ParammsLogin = z.infer<typeof myFluxLoginSchema>;
export type ParamsGetTitle = z.infer<typeof processoSchema>