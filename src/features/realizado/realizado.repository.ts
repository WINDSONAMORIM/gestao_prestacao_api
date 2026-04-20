import { pool } from "../../lib/db.js";
import { prisma } from "../../lib/prisma.js";

type Total = {
    total: number;
};

export class RealizadoRepository {
    async getTotalRealizado() {
        const result = await pool.query(`
      SELECT COALESCE(SUM(valor), 0) as total FROM fato_realizado
    `);
        return Number(result.rows[0].total) || 0;
    }

    async getRealizadoMensal(ano: number, mes: number) {
        const result = await prisma.$queryRaw<Total[]>`
             SELECT COALESCE(SUM(r.valor), 0) as total
                FROM fato_realizado r
                JOIN dim_tempo dt ON dt.id_data = r.id_data
                WHERE dt.ano = ${ano}
                AND dt.mes = ${mes}`;

        return result[0]?.total ?? 0
    }
}
