import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { OrcadoQuery } from "./orcado.query.js";

export class OrcadoRepository {
  constructor(private query: OrcadoQuery){};

  async getTotalOrcado(params: ParamsAnual) {
    return await this.query.orcadoAnualQuery(params)
  }

  async getOrcadoMensal(params: ParamsMensal) {     
    return await this.query.orcadoMensalQuery(params)
  }

}
  // async getGrupo() {
  //   const result = await pool.query(`
  //     SELECT * from grupo
  //   `);

  //   return result.rows;
  // }

  // async getOrcadoByGrupo(grupo: string) {
  //   const result = await pool.query(
  //     `
  //     SELECT SUM(valor) as total FROM fato_orcado fo JOIN grupo g ON fo.id_rubrica LIKE (g.id_grupo || '%')
  //     WHERE g.id_grupo = $1
  //   `,
  //     [grupo],
  //   );
  //   return Number(result.rows[0].total) || 0;
  // }
