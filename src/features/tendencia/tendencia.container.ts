import { TendenciaController } from "./tendencia.controller.js";
import { TendeciaRepository } from "./tendencia.repository.js";
import { TendenciaService } from "./tendencia.service.js";

const tendenciaRepository = new TendeciaRepository();
const tendenciaService = new TendenciaService(tendenciaRepository);
const tendenciaController = new TendenciaController(tendenciaService);

export { tendenciaController };