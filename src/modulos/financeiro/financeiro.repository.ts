import { pool } from "../../lib/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getResumoPorGrupoQuery = fs.readFileSync(
  path.resolve(__dirname, "queries", "getResumoPorGrupo.sql"),
  "utf8",
);

const getResumoPorSubGrupoQuery = fs.readFileSync(
  path.resolve(__dirname, "queries", "getResumoPorSubGrupo.sql"),
  "utf8",
);

const getTendenciaMensalPorGrupoQuery = fs.readFileSync(
  path.resolve(__dirname, "queries", "getTendenciaMensalPorGrupo.sql"),
  "utf8",
);
export class FinanceiroRepository {
  async getResumoPorGrupo() {
    const result = await pool.query(getResumoPorGrupoQuery);
    return result.rows;
  }

  async getResumoPorSubGrupo(grupoId?: string) {
    const result = await pool.query(getResumoPorSubGrupoQuery, [grupoId]);
    return result.rows;
  }

  async getTendenciaMensalPorGrupo(grupoId: string) {
    console.log("grupoId:", grupoId, "length:", grupoId?.length);
    const result = await pool.query(getTendenciaMensalPorGrupoQuery, [grupoId]);
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
