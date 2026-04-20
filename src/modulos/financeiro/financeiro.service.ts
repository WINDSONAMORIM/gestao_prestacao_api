import { AppError } from "../../utils/appError.js";
import { FinanceiroRepository } from "./financeiro.repository.js";

export class FinanceiroService {
  constructor(private repository: FinanceiroRepository) {}

  async getResumoAnualPorGrupo(ano: number) {
    const result = await this.repository.getResumoAnualPorGrupo(ano);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo encontrado por grupo");
    }
    return result;
  }

  async getResumoMensalPorGrupo(ano: number, mes: number) {
    const result = await this.repository.getResumoMensalPorGrupo(ano, mes);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo encontrado por grupo");
    }
    return result;
  }

  async getResumoAnualPorSubGrupo(ano:number, grupoId?: string) {
    const result = await this.repository.getResumoAnualPorSubGrupo(ano, grupoId);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum resumo encontrado por subgrupo");
    }
    return result;
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    const result = await this.repository.getTendenciaMensalPorGrupo(grupoId);
    if (!result || result.length === 0) {
      throw new AppError("Nenhuma tendência mensal encontrada por grupo");
    }
    return result;
  }

  async getVariacaoOrcadoRealizado() {
    const variacao = await this.repository.getVariacaoOrcadoRealizado();
    if (variacao === null || variacao === undefined) {
      throw new AppError("Não foi possível calcular a variação entre orçado e realizado");
    }
    return variacao;
  }

  async getExecucaoOrcadoRealizado() {
    const execucao = await this.repository.getExecucaoOrcadoRealizado();
    if (execucao === null || execucao === undefined) {
      throw new AppError("Não foi possível calcular a execução entre orçado e realizado");
    } 
    return execucao;
  }

  async getTopAnualExcedeOrcado(ano: number) {
    const result = await this.repository.getTopAnualExcedeOrcado(ano);
    if (!result || result.length === 0) {
      throw new AppError("Nenhum grupo encontrado que excedeu o orçamento anual");
    }
    return result;
  }
}