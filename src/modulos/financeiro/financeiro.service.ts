import { FinanceiroRepository } from "./financeiro.repository.js";

export class FinanceiroService {
  constructor(private repository: FinanceiroRepository) {}

  async getResumoPorGrupo() {
    const result = await this.repository.getResumoPorGrupo();
    if (!result || result.length === 0) {
      throw new Error("Nenhum resumo encontrado por grupo");
    }
    return result;
  }

  async getResumoPorSubGrupo(grupoId?: string) {
    const result = await this.repository.getResumoPorSubGrupo(grupoId);
    if (!result || result.length === 0) {
      throw new Error("Nenhum resumo encontrado por subgrupo");
    }
    return result;
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    const result = await this.repository.getTendenciaMensalPorGrupo(grupoId);
    if (!result || result.length === 0) {
      throw new Error("Nenhuma tendência mensal encontrada por grupo");
    }
    return result;
  }

  async getVariacaoOrcadoRealizado() {
    const variacao = await this.repository.getVariacaoOrcadoRealizado();
    if (variacao === null || variacao === undefined) {
      throw new Error("Não foi possível calcular a variação entre orçado e realizado");
    }
    console.log("Variação Service", variacao);
    return variacao;
  }

  async getExecucaoOrcadoRealizado() {
    const execucao = await this.repository.getExecucaoOrcadoRealizado();
    if (execucao === null || execucao === undefined) {
      throw new Error("Não foi possível calcular a execução entre orçado e realizado");
    } 
    return execucao;
  }
}