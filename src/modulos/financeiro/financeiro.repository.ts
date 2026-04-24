import { pool } from "../../lib/db.js";
import { ParamsAnual, ParamsAnualGrupo, ParamsMensal, ParamsMensalGrupo } from "../../schemas/paramsShema.js";
import { resumoAnualPorGrupo } from "./queries/getResumoAnualPorGrupo.js";
import { resumoAnualPorSubgrupo } from "./queries/getResumoAnualPorSubGrupo.js";
import { resumoMensalPorGrupo } from "./queries/getResumoMensalPorGrupo.js";
import { resumoMensalPorSubgrupo } from "./queries/getResumoMensalPorSubGrupo.js";
import { queries } from "./queries/index.js";

export class FinanceiroRepository {
  async getResumoAnualPorGrupo(params: ParamsAnual) {    
    return resumoAnualPorGrupo(params);
  }

  async getResumoMensalPorGrupo(params: ParamsMensal) {
    return resumoMensalPorGrupo(params)
   }

  async getResumoAnualPorSubGrupo(params: ParamsAnualGrupo) {
    return resumoAnualPorSubgrupo(params)
  }

  async getResumoMensalPorSubGrupo(params: ParamsMensalGrupo){
    return resumoMensalPorSubgrupo(params)
  }

  

  async getTendenciaMensalPorGrupo(grupoId: string) {
    const result = await pool.query(queries.getTendenciaMensalPorGrupo, [
      grupoId,
    ]);
    return result.rows;
  }

  async getVariacaoOrcadoRealizado() {
    const result = await pool.query(`
      select
        coalesce ((select sum(valor) from fato_orcado),0)-
        coalesce ((select sum(valor) from fato_realizado),0)
        as variacao
    `);
    return Number(result.rows[0].variacao) || 0;
  }

  async getExecucaoOrcadoRealizado() {
    const result = await pool.query(`
      select
        (select sum(valor) from fato_realizado) as total_realizado)/
        (select sum(valor) from fato_orcado) as total_orcado)
        as execucao
    `);
    return result.rows[0].execucao;
  }

  async getTopAnualExcedeOrcado(ano: number) {
    const result = await pool.query(queries.getTopAnualExcedeOrcado, [ano]);
    return result.rows;
  }
}
