import { pool } from "../../lib/db.js";

export class RealizadoRepository {
    async getTotalRealizado() {
    const result = await pool.query(`
      SELECT COALESCE(SUM(valor), 0) as total FROM fato_realizado
    `);
        return Number(result.rows[0].total) || 0;
    }
}
