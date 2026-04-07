import { pool } from "../../lib/db.js";

export class FinanceiroRepository {
  async getResumoPorGrupo() {
    const result = await pool.query(`
       SELECT g.id, g.descricao, COALESCE(o.total_orcado, 0) AS orcado,
        COALESCE(r.total_realizado, 0) AS realizado
        FROM grupo g

        LEFT JOIN (
          SELECT sg.grupo_id, SUM(o.valor) AS total_orcado
          FROM fato_orcado o
          JOIN rubrica rb ON rb.id = o.rubrica
          JOIN subgrupo sg ON sg.id = rb.subgrupo_id
          GROUP BY sg.grupo_id
        ) o ON o.grupo_id = g.id

        LEFT JOIN (
          SELECT sg.grupo_id, SUM(r.valor) AS total_realizado
          FROM fato_realizado r
          JOIN rubrica rb ON rb.id = r.rubrica
          JOIN subgrupo sg ON sg.id = rb.subgrupo_id
          GROUP BY sg.grupo_id
        ) r ON r.grupo_id = g.id

        ORDER BY g.id ASC;
    `);
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
    return Number(result.rows[0].variacao)||0;
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
