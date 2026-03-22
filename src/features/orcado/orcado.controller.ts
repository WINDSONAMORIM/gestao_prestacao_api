import { success } from "../../utils/apiResponse.js";
import { OrcadoService } from "./orcado.service.js";

export class OrcadoController {
  constructor(private service: OrcadoService) {}
  
  async getTotalOrcado() {
    const result = await this.service.getTotalOrcado();
    return  success({total:result });
  }
}
