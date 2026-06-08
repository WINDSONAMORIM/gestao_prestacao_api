import { MyfluxController } from "../../clients/myFlux/myFlux.controller.js";
import { MyFluxService } from "../../clients/myFlux/myFlux.repository.js";
import { xlxsParseJson } from "../../shared/xlsx/xlsx.service.js";
import { ZipService } from "../../shared/zip/zip.service.js";

const service = new MyFluxService();
const controller = new MyfluxController(service);

interface Processo {
  Seq: string;
  Id: string;
}

export interface Table{
  headers: string[]
  data: Processo[]
}

export class DownloadProcessService {
  constructor() {}
  
  async fillOutWorksheet(file: Buffer): Promise<Table> {
    const result = await xlxsParseJson<Processo>(file);
    console.log(result)
    
    return result
  };
  
  
  async downloaderProcesses(processId: number[],token: string): Promise<Buffer> {
    // const processos: object[] = [];
    const processos: string[] = [];
    const zipService = new ZipService()
    try {
      for (const id of processId) {
        console.log(`Baixando processo com ID: ${id}`);
        const result = await controller.downloaderProcess(id, token);
        const padrao = await zipService.padronizaProcesso(result)
        console.log(padrao)
        // processos.push(result);
        processos.push(padrao);
      }
      const buffer = await zipService.zipProcesso(processos)
      return buffer;

    } catch (error) {
      console.error("Erro ao baixar processos:", error);
      throw error;
    }
  }
}
