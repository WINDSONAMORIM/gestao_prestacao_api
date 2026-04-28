import { ParamsAnual, ParamsAnualGrupo, ParamsAnualSubGrupo, ParamsGrupo, ParamsMensal, ParamsMensalGrupo, ParamsMensalSubGrupo, ParamsSubGrupo } from "../../schemas/paramsShema.js";
import { resumoAnualPorGrupo } from "./queries/getResumoAnualPorGrupo.js";
import { resumoAnualPorSubgrupo } from "./queries/getResumoAnualPorSubGrupo.js";
import { resumoMensalPorGrupo } from "./queries/getResumoMensalPorGrupo.js";
import { resumoMensalPorSubgrupo } from "./queries/getResumoMensalPorSubGrupo.js";
import { resumoAnualPorRubrica } from "./queries/getResumoAnualPorRubrica.js";

export class FinanceiroRepository {
  async getResumoAnualPorGrupo(params: ParamsAnual) {    
    return resumoAnualPorGrupo(params);
  }

  async getResumoMensalPorGrupo(params: ParamsMensal) {
    return resumoMensalPorGrupo(params)
   }

  async getResumoAnualPorSubGrupo(params: ParamsAnualGrupo) {
    return resumoAnualPorSubgrupo(params)
  }

  async getResumoMensalPorSubGrupo(params: ParamsMensalGrupo){
    return resumoMensalPorSubgrupo(params)
  }  

  async getResumoAnualPorRubrica(params: ParamsAnualSubGrupo){
    return resumoAnualPorRubrica(params)
  }

   async getResumoMensalPorRubrica(params: ParamsMensalSubGrupo){
    return resumoAnualPorRubrica(params)
  }
}
  
 
