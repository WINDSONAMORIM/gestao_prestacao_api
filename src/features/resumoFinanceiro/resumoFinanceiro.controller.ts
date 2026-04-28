import { FinanceiroService } from "./resumoFinanceiro.service.js";
import { ParamsAnual, ParamsAnualGrupo, ParamsAnualSubGrupo, ParamsMensal, ParamsMensalGrupo, ParamsMensalSubGrupo } from "../../schemas/paramsShema.js";

export class FinanceiroController {
  constructor(private service: FinanceiroService) {}

  async getResumoAnualPorGrupo(params: ParamsAnual) {
    const result = await this.service.getResumoAnualPorGrupo(params);
    return result;
  }

  async getResumoMensalPorGrupo(params: ParamsMensal) {
    const result = await this.service.getResumoMensalPorGrupo(params);
    return result;
  }

  async getResumoAnualPorSubGrupo(params: ParamsAnualGrupo) {
    const result = await this.service.getResumoAnualPorSubGrupo(params);
    return result;
  }

  async getResumoMensalPorSubGrupo(params: ParamsMensalGrupo) {
    const result = await this.service.getResumoMensalPorSubgrupo(params);
    return result;
  }

  async getResumoAnualPorRubrica(params: ParamsAnualSubGrupo){
      const result = await this.service.getResumoAnualPorRubrica(params);
      return result;
  } 

  async getResumoMensalPorRubrica(params: ParamsMensalSubGrupo){
      const result = await this.service.getResumoMensalPorRubrica(params);
      return result;
  } 

}
