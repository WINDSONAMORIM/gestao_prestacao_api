import { success } from "../../utils/apiResponse.js";
import { RealizadoService } from "./realizado.service.js";

export class RealizadoController {
    constructor(private service: RealizadoService) {}

    async getTotalRealizado() { 
        const result = await this.service.getTotalRealizado();
        return success({ total: result });
    }
}