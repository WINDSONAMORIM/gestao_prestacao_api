import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadQuery(file: string) {
  return fs.readFileSync(path.resolve(__dirname, file), "utf8");
}

export const queries = {
  // getResumoAnualPorGrupo: loadQuery("getResumoAnualPorGrupo.sql"),
  // getResumoMensalPorGrupo: loadQuery("getResumoMensalPorGrupo.sql"),
  // getResumoAnualPorSubGrupo: loadQuery("getResumoAnualPorSubGrupo.sql"),
  // getTendenciaMensalPorGrupo: loadQuery("getTendenciaMensalPorGrupo.sql"),
  getTopAnualExcedeOrcado: loadQuery("getTopAnualExcedeOrcado.sql"),
};