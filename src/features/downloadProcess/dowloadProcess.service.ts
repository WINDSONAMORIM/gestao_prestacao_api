import { MyfluxController } from "../../clients/myFlux/myFlux.controller.js";
import { MyFluxService } from "../../clients/myFlux/myFlux.repository.js";
import { sendProgress } from "../../shared/sse/sse.service.js";
import { xlxsParseJson } from "../../shared/xlsx/xlsx.service.js";
import { ZipService } from "../../shared/zip/zip.service.js";
import { Processo, Table } from "./dowloadProcess.types.js";

const service = new MyFluxService();
const controller = new MyfluxController(service);

export class DownloadProcessService {
  constructor() { }

  async fillOutWorksheet(file: Buffer): Promise<Table> {
    const result = await xlxsParseJson<Processo>(file);
    console.log("fillOutWorksheet", result)

    return result
  };

  async downloaderProcesses(processosList: Processo[], token: string): Promise<Buffer> {
    const processos: string[] = [];
    const zipService = new ZipService()
    try {
      for (const processo of processosList) {
        try {
          console.log(`Baixando processo com ID: ${processo.Id}`);
          sendProgress(processo.Id, "pendente")
          const result = await controller.downloaderProcess(Number(processo.Id), token);
          const title = await controller.getTitle({id : Number(processo.Id)}, token);
          // const pasta = `${processo.Seq}_${processo.Id}`;
          const pasta = `${processo.Seq}_${title.titulo}`;
          const padrao = await zipService.padronizaProcesso(result, pasta)
          sendProgress(processo.Id, "baixando")
          console.log(`padrao em downloadProcess Service: ${padrao}`)
          processos.push(padrao);
          sendProgress(processo.Id, "concluido")
        } catch (error) {
          console.error(
            `Erro no processo ${processo.Id}:`,
            error
          );

          sendProgress(
            processo.Id,
            "erro"
          );
          
          continue;
        }
      }
      const buffer = await zipService.zipProcesso(processos)
      return buffer;

    } catch (error) {
      console.error("Erro ao baixar processos:", error);
      throw error;
    }
  }
}
