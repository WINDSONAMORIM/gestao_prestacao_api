import { success } from "../../utils/apiResponse.js";
import { OrcadoService } from "./orcado.service.js";

export class OrcadoController {
  constructor(private service: OrcadoService) {}
  
  async getTotalOrcado() {
    const result = await this.service.getTotalOrcado();
    return  success({total:result });
  }

  async getOrcadoMensal(ano:number, mes:number){
    const result = await this.service.getOrcadoMensal(ano, mes)
        return success({total: result});
  }

  async getGrupo() {
    const result = await this.service.getGrupo();
    return success(result);
  }

  async getOrcadoByGrupo(grupo: string) {
    const result = await this.service.getOrcadoByGrupo(grupo);
    return success({ total: result });
  }
}
