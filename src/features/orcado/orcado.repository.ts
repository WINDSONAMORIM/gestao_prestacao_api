import { pool } from "../../lib/db.js";

export class OrcadoRepository {
  async getTotalOrcado() {
    const result = await pool.query(`
      SELECT COALESCE(SUM(valor), 0) as total FROM fato_orcado
    `);

    return Number(result.rows[0].total) || 0;
  }

  async getGrupo() {
    const result = await pool.query(`
      SELECT * from grupo
    `);

    return result.rows;
  }

  async getOrcadoByGrupo(grupo : string) {
    const result = await pool.query(`
      SELECT SUM(valor) as total FROM fato_orcado fo JOIN grupo g ON fo.rubrica LIKE (g.id || '%')
      WHERE g.id = $1
    `, [grupo]);
    return Number(result.rows[0].total) || 0;
  }

}
