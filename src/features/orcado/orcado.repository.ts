import { pool } from "../../lib/db.js";

export class OrcadoRepository {
  async getTotalOrcado() {
    const result = await pool.query(`
      SELECT COALESCE(SUM(valor), 0) as total FROM fato_orcamento
    `);

    return Number(result.rows[0].total) || 0;
  }
}
