import { pool } from "../../lib/db.js";
import { queries } from "./queries/index.js";

export class FinanceiroRepository {
  async getResumoAnualPorGrupo(ano: number) {
    const result = await pool.query(queries.getResumoAnualPorGrupo, [ano]);
    return result.rows;
  }

  async getResumoMensalPorGrupo(ano: number, mes: number) {
    const result = await pool.query(queries.getResumoMensalPorGrupo, [ano,mes]);
    return result.rows;
  }

  async getResumoAnualPorSubGrupo(ano: number, grupoId?: string) {
    console.log(`Repository Ano: ${ano} Grupo: ${grupoId}`)
    const result = await pool.query(queries.getResumoAnualPorSubGrupo, [ano, grupoId]);
    return result.rows;
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    console.log("grupoId:", grupoId, "length:", grupoId?.length);
    const result = await pool.query(queries.getTendenciaMensalPorGrupo, [grupoId]);
    return result.rows;
  }

  async getVariacaoOrcadoRealizado() {
    console.log("Calculando variação entre orçado e realizado...");
    const result = await pool.query(`
      select
        coalesce ((select sum(valor) from fato_orcado),0)-
        coalesce ((select sum(valor) from fato_realizado),0)
        as variacao
    `);
    console.log("Variação Repository", result);
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
}
