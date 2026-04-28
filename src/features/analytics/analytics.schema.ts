import { paramsAnualSchema } from "../../schemas/paramsShema.js"
import { apiResponseTopExcedeOrcadoSchema } from "../../schemas/responseSchema.js"

export const analyticsRouteSchema = {
    schema: {
        params: paramsAnualSchema,
        description:
            "Rota para obter os grupos que mais excederam o orçamento anual",
        tags: ["Analytics"],
        response: {
            200: apiResponseTopExcedeOrcadoSchema,
        },
    },
}