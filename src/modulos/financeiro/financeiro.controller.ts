
import { success } from "../../utils/apiResponse.js";
import { FinanceiroService } from "./financeiro.service.js";

export class FinanceiroController {
  constructor(private service: FinanceiroService) {}

  async getResumoPorGrupo() {
    const result = await this.service.getResumoPorGrupo();
    return success(result)  ;
  }

  async getVariacaoOrcadoRealizado() {
    const variacao = await this.service.getVariacaoOrcadoRealizado();
    console.log("Variação Controller", variacao);
    return success( variacao );
  }

  async getExecucaoOrcadoRealizado() {
    const execucao = await this.service.getExecucaoOrcadoRealizado();
    return success( execucao );
  }

}