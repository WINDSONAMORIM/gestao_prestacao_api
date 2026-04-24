import { AppError } from "../../utils/appError.js";
import { OrcadoRepository } from "./orcado.repository.js";
import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";

export class OrcadoService {
  constructor(private repository: OrcadoRepository) {}

  async getTotalOrcado(params: ParamsAnual) {
    const result = await this.repository.getTotalOrcado(params);
    
    if (!result) {
      throw new AppError("Nenhum orçamento encontrado", 404);
    }

    return result;
  }

  async getOrcadoMensal(params: ParamsMensal){
    const result = await this.repository.getOrcadoMensal(params);
     if(!result){
      throw new AppError("Total mesnal não encontrado", 404)
    }
    return result;
  }
  
}
  // async getGrupo() {
  //   const result = await this.repository.getGrupo();
  //   if (!result) {
  //     throw new AppError("Nenhum grupo encontrado", 404);
  //   } 
  //   return result;  
  // }

  // async getOrcadoByGrupo(grupo: string) {
  //   const result = await this.repository.getOrcadoByGrupo(grupo);
  //   if (!result) {
  //     throw new AppError("Nenhum orçamento encontrado para o grupo especificado", 404);
  //   }
  //   return result;
  // }
