import { pool } from "../../lib/db.js";
import { ParamsAnual } from "../../schemas/paramsShema.js";
import { topAnualExcedeOrcado } from "./queries/getTopAnualExcedeOrcado.js";

export class AnalyticsRepository {
    async getTopAnualExcedeOrcado(params: ParamsAnual) {
        return topAnualExcedeOrcado(params)
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
}