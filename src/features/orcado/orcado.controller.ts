import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { OrcadoService } from "./orcado.service.js";

export class OrcadoController {
  constructor(private service: OrcadoService) {}
  
  async getTotalOrcado(params: ParamsAnual) {
    const result = await this.service.getTotalOrcado(params);
    return  result;
  }

  async getOrcadoMensal(params: ParamsMensal){
    const result = await this.service.getOrcadoMensal(params)
        return result;
  }

}
  // async getGrupo() {
  //   const result = await this.service.getGrupo();
  //   return success(result);
  // }

  // async getOrcadoByGrupo(grupo: string) {
  //   const result = await this.service.getOrcadoByGrupo(grupo);
  //   return success({ total: result });
  // }
