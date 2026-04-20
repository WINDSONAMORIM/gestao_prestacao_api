import { AppError } from "../../utils/appError.js";
import { RealizadoRepository } from "./realizado.repository.js";

export class RealizadoService {
  constructor(private repository: RealizadoRepository) {}

  async getTotalRealizado() {
    const result = await this.repository.getTotalRealizado();
    if (!result) {
      throw new AppError("Nenhum valor realizado encontrado", 404);
    }
    return result;
  }

  async getRealizadoMensal(ano:number, mes: number){
    const result = await this.repository.getRealizadoMensal(ano, mes);
    if(!result){
      throw new AppError("Total mesnal não encontrado", 404)
    }
    return result;
  }
}
