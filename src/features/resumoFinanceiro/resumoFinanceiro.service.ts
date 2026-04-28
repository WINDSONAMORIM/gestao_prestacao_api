import { ParamsAnual, ParamsAnualGrupo, ParamsAnualSubGrupo, ParamsMensal, ParamsMensalGrupo, ParamsMensalSubGrupo } from "../../schemas/paramsShema.js";
import { AppError } from "../../utils/appError.js";
import { FinanceiroRepository } from "./resumoFinanceiro.repository.js";

export class FinanceiroService {
  constructor(private repository: FinanceiroRepository) {}

  async getResumoAnualPorGrupo(params: ParamsAnual) {
    const result = await this.repository.getResumoAnualPorGrupo(params);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo anual encontrado por grupo");
    }
    return result;
  }

  async getResumoAnualPorSubGrupo(params: ParamsAnualGrupo) {
    const result = await this.repository.getResumoAnualPorSubGrupo(params);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo anual encontrado por subgrupo");
    }
    return result;
  }

  async getResumoAnualPorRubrica(params: ParamsAnualSubGrupo){
    const result = await this.repository.getResumoAnualPorRubrica(params);
    if(!result || result.length === 0){
      throw new AppError("Nenhum resumo anual encontrado por Rubrica")
    }
    return result
  }

  async getResumoMensalPorGrupo(params: ParamsMensal) {
    const result = await this.repository.getResumoMensalPorGrupo(params);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo mensal encontrado por grupo");
    }
    return result;
  }

  async getResumoMensalPorSubgrupo(params: ParamsMensalGrupo){
    const result = await this.repository.getResumoMensalPorSubGrupo(params);
    if(!result || result.length === 0){
      throw new AppError("Nenhum resumo mensal encontrado por subgrupo")
    }
    return result
  }

  async getResumoMensalPorRubrica(params: ParamsMensalSubGrupo){
    const result = await this.repository.getResumoMensalPorRubrica(params);
     if(!result || result.length === 0){
      throw new AppError("Nenhum resumo mensal encontrado por Rubrica")
    }
    return result
  }  
}