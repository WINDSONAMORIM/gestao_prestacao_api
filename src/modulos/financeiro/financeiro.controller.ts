import { success } from "../../utils/apiResponse.js";
import { FinanceiroService } from "./financeiro.service.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { financeiroParamsGrupoSchema } from "./financeiro.schema.js";
import z from "zod";
import { ParamsAnual, ParamsAnualGrupo, ParamsMensal, ParamsMensalGrupo } from "../../schemas/paramsShema.js";

export class FinanceiroController {
  constructor(private service: FinanceiroService) {}

  async getResumoAnualPorGrupo(params: ParamsAnual) {
    const result = await this.service.getResumoAnualPorGrupo(params);
    return result;
  }

  async getResumoMensalPorGrupo(params: ParamsMensal) {
    const result = await this.service.getResumoMensalPorGrupo(params);
    return result;
  }

  async getResumoAnualPorSubGrupo(params: ParamsAnualGrupo) {
    const result = await this.service.getResumoAnualPorSubGrupo(params);
    return result;
  }

  async getResumoMensalPorSubGrupo(params: ParamsMensalGrupo) {
    const result = await this.service.getResumoMensalPorSubgrupo(params);
    return result;
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    const result = await this.service.getTendenciaMensalPorGrupo(grupoId);
    return success(result);
  }

  async getVariacaoOrcadoRealizado() {
    const variacao = await this.service.getVariacaoOrcadoRealizado();
    return success(variacao);
  }

  async getExecucaoOrcadoRealizado() {
    const execucao = await this.service.getExecucaoOrcadoRealizado();
    return success(execucao);
  }

  async getTopAnualExcedeOrcado(ano: number) {
    const result = await this.service.getTopAnualExcedeOrcado(ano);
    return success(result);
  }
}
