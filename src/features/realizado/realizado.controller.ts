import { ParamsAnual, ParamsMensal } from "../../schemas/paramsShema.js";
import { RealizadoService } from "./realizado.service.js";

export class RealizadoController {
    constructor(private service: RealizadoService) {}

    async getTotalRealizado(params: ParamsAnual) { 
        const result = await this.service.getTotalRealizado(params);
        return result;
    }

    async getRealizadoMensal(params: ParamsMensal) {
        const result = await this.service.getRealizadoMensal(params)
        return result;
    }
}