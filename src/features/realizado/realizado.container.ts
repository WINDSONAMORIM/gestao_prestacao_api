import { RealizadoController } from "./realizado.controller.js";
import { RealizadoQuery } from "./realizado.query.js";
import { RealizadoRepository } from "./realizado.repository.js";
import { RealizadoService } from "./realizado.service.js";

const realizadoQuery = new RealizadoQuery();
const realizadoRepository = new RealizadoRepository(realizadoQuery);
const realizadoService = new RealizadoService(realizadoRepository);
const realizadoController = new RealizadoController(realizadoService);

export { realizadoController };