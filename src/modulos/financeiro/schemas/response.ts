import z from "zod";
import { financeiroResponseSchemaDTO } from "./dto.js";

export const financeiroResumoResponseGrupo = financeiroResponseSchemaDTO(
  z.array(
    z.object({
      id_grupo: z.string(),
      descricao: z.string(),
      orcado: z.number().nullable(),
      realizado: z.number().nullable(),
    }),
  ),
);

export const financeiroResumoResponseSubgrupo = financeiroResponseSchemaDTO(
  z.array(
    z.object({
      id_subgrupo: z.string(),
      descricao: z.string(),
      id_grupo: z.string(),
      orcado: z.number().nullable(),
      realizado: z.number().nullable(),
    }),
  ),
);

export const excedenteAnualResponse = financeiroResponseSchemaDTO(
  z.array(
    z.object({
      id_grupo: z.string(),
      orcado: z.coerce.number(),
      realizado: z.coerce.number(),
      diferenca: z.coerce.number(),
      perc: z.coerce.number(),
    }),
  ),
);
