import { pool } from "../../lib/db.js";
import { prisma } from "../../lib/prisma.js";
import { ParamsMensal } from "../../schemas/paramsShema.js";
import { orcadoMensal } from "./orcado.query.js";

type Total = {
    total: number;
};

export class OrcadoRepository {
  async getTotalOrcado() {
    const result = await pool.query(`
      SELECT COALESCE(SUM(valor), 0) as total FROM fato_orcado
    `);

    return Number(result.rows[0].total) || 0;
  }

  async getOrcadoMensal(ano: number, mes: number) {
    const result = await prisma.$queryRaw<Total[]>`
          SELECT COALESCE(SUM(o.valor), 0) as total
            FROM fato_orcado o
            JOIN dim_tempo dt ON dt.id_data = o.id_data
            WHERE dt.ano = ${ano}
            AND dt.mes = ${mes}`;

    return result[0]?.total ?? 0;
  }

  // async getOrcadoMensal(params: ParamsMensal) {     
  //   return await orcadoMensal(params)
  // }

  async getGrupo() {
    const result = await pool.query(`
      SELECT * from grupo
    `);

    return result.rows;
  }

  async getOrcadoByGrupo(grupo: string) {
    const result = await pool.query(
      `
      SELECT SUM(valor) as total FROM fato_orcado fo JOIN grupo g ON fo.id_rubrica LIKE (g.id_grupo || '%')
      WHERE g.id_grupo = $1
    `,
      [grupo],
    );
    return Number(result.rows[0].total) || 0;
  }
}
