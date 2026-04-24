import { AppError } from "../../utils/appError.js";
import { RealizadoRepository } from "./realizado.repository.js";
import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";

export class RealizadoService {
  constructor(private repository: RealizadoRepository) {}

  async getTotalRealizado(params: ParamsAnual) {
    const result = await this.repository.getTotalRealizado(params);
    if (!result) {
      throw new AppError("Nenhum valor realizado encontrado", 404);
    }
    return result;
  }

  async getRealizadoMensal(params: ParamsMensal){
    const result = await this.repository.getRealizadoMensal(params);
    if(!result){
      throw new AppError("Total mesnal não encontrado", 404)
    }
    return result;
  }
}
