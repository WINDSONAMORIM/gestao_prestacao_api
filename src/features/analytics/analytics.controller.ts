import { ParamsAnual } from "../../schemas/paramsShema.js";
import { AnalyticsService } from "./analytics.service.js";

export class AnalyticsController {
    constructor(private service: AnalyticsService) { }

    async getTopAnualExcedeOrcado(params: ParamsAnual) {
        const result = await this.service.getTopAnualExcedeOrcado(params);
        result.map((i)=>{console.log(`Controller: ${i.id_grupo} - ${i.orcado} - ${i.realizado} - ${i.diferenca} - ${i.perc}`)})
        return result;
    }

    async getVariacaoOrcadoRealizado() {
        const variacao = await this.service.getVariacaoOrcadoRealizado();
        return variacao;
    }

    async getExecucaoOrcadoRealizado() {
        const execucao = await this.service.getExecucaoOrcadoRealizado();
        return execucao;
    }

}