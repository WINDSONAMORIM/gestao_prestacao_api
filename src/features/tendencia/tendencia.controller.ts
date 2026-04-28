import { ParamsGrupo, ParamsSubGrupo } from "../../schemas/paramsShema.js";
import { TendenciaService } from "./tendencia.service.js";

export class TendenciaController {
    constructor (private service: TendenciaService){}

  async getTendenciaMensalPorGrupo(params: ParamsGrupo) {
    const result = await this.service.getTendenciaMensalPorGrupo(params);
    return result;
  }

  async getTendenciaMensalPorSubGrupo(params: ParamsSubGrupo) {
    const result = await this.service.getTendenciaMensalPorSubgrupo(params);
    return result;
  }

}