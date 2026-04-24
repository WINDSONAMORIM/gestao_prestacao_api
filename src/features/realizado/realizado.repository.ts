import { prisma } from "../../lib/prisma.js";
import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { RealizadoQuery } from "./realizado.query.js";

export class RealizadoRepository {
    constructor(private query: RealizadoQuery){}

    async getTotalRealizado(params: ParamsAnual) {
        return await this.query.realizadoAnualQuery(params)
    }       
        
    async getRealizadoMensal(params: ParamsMensal) {
        return await this.query.RealizadoMensalQuery(params)    
        }
    }
