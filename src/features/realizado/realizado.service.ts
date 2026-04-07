import { AppError } from "../../utils/appError.js";
import { RealizadoRepository } from "./realizado.repository.js";

export class RealizadoService {
    constructor(private repository: RealizadoRepository) {}

    async getTotalRealizado() {
        const result = await this.repository.getTotalRealizado();
        if (!result) {
            throw new AppError("Nenhum valor realizado encontrado", 404);
        }
        return result;
    }
}