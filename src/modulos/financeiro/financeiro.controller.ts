import { success } from "../../utils/apiResponse.js";
import { FinanceiroService } from "./financeiro.service.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { financeiroParamsGrupoSchema } from "./financeiro.schema.js";
import z from "zod";

export class FinanceiroController {
  constructor(private service: FinanceiroService) {}

  async getResumoPorGrupo() {
    const result = await this.service.getResumoPorGrupo();
    return success(result);
  }

  async getResumoPorSubGrupo(grupoId: string) {
    const result = await this.service.getResumoPorSubGrupo(grupoId);
    return success(result);
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    const result = await this.service.getTendenciaMensalPorGrupo(grupoId);
    return success(result);
  }

  async getVariacaoOrcadoRealizado() {
    const variacao = await this.service.getVariacaoOrcadoRealizado();
    console.log("Variação Controller", variacao);
    return success(variacao);
  }

  async getExecucaoOrcadoRealizado() {
    const execucao = await this.service.getExecucaoOrcadoRealizado();
    return success(execucao);
  }
}