import { AppError } from "../../utils/appError.js";
import { OrcadoRepository } from "./orcado.repository.js";

export class OrcadoService {
  constructor(private repository: OrcadoRepository) {}

  async getTotalOrcado() {
    const result = await this.repository.getTotalOrcado();
    
    if (!result) {
      throw new AppError("Nenhum orçamento encontrado", 404);
    }

    return result;
  }
}
