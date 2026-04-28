import { ParamsGrupo, ParamsSubGrupo } from "../../schemas/paramsShema.js";
import { tendenciaMensalPorGrupo } from "./queries/getTendenciaMensalPorGrupo.js";
import { tendenciaMensalPorSubGrupo } from "./queries/getTendenciaMensalPorSubGrupo.js";

 export class TendeciaRepository{

  async getTendenciaMensalPorGrupo(params: ParamsGrupo) {
    return tendenciaMensalPorGrupo(params)
  }

  async getTendenciaMensalPorSubGrupo(params: ParamsSubGrupo) {
    const result = await tendenciaMensalPorSubGrupo(params);
    return tendenciaMensalPorSubGrupo(params)
  }

}