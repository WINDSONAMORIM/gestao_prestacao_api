import { success } from "../../utils/apiResponse.js";
import { FinanceiroService } from "./financeiro.service.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { financeiroParamsGrupoSchema } from "./financeiro.schema.js";
import z from "zod";

export class FinanceiroController {
  constructor(private service: FinanceiroService) {}

  async getResumoAnualPorGrupo(ano: number) {
    const result = await this.service.getResumoAnualPorGrupo(ano);
    return success(result);
  }

  async getResumoMensalPorGrupo(ano: number, mes: number) {
    const result = await this.service.getResumoMensalPorGrupo(ano, mes);
    return success(result);
  }

  async getResumoAnualPorSubGrupo(ano: number, grupoId: string) {
    console.log(`Controller Ano: ${ano} Grupo: ${grupoId}`)
    const result = await this.service.getResumoAnualPorSubGrupo(ano, grupoId);
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