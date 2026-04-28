import { ParamsAnual } from "../../schemas/paramsShema.js";
import { AppError } from "../../utils/appError.js";
import { AnalyticsRepository } from "./analytics.repository.js";

export class AnalyticsService {
    constructor(private repository: AnalyticsRepository) { }

    async getTopAnualExcedeOrcado(params: ParamsAnual) {
        const result = await this.repository.getTopAnualExcedeOrcado(params);
        if (!result || result.length === 0) {
            throw new AppError("Nenhum Ranking anual encontrado por grupo");
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
    
}