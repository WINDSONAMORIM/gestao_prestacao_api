import { OrcadoController } from "./orcado.controller.js";
import { OrcadoQuery } from "./orcado.query.js";
import { OrcadoRepository } from "./orcado.repository.js";
import { OrcadoService } from "./orcado.service.js";

const orcadoQuery = new OrcadoQuery();
const orcadoRepository = new OrcadoRepository(orcadoQuery);
const orcadoService = new OrcadoService(orcadoRepository);
const orcadoController = new OrcadoController(orcadoService);

export { orcadoController };