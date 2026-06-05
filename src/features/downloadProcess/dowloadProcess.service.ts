import { MyfluxController } from "../../clients/myFlux/myFlux.controller.js";
import { MyFluxService } from "../../clients/myFlux/myFlux.repository.js";
import { xlxsParseJson } from "../../shared/xlsx/xlsx.service.js";

const service = new MyFluxService();
const controller = new MyfluxController(service);

export class DownloadProcessService {
  constructor() {}

  async fillOutWorksheet(file: Buffer): Promise<{ headers: string[]; dataRows: any[] }> {
    const { headers, dataRows } = await xlxsParseJson(file);
    return { headers, dataRows };
  }

  async downloaderProcesses(
    processId: number[],
    token: string,
  ): Promise<object[]> {
    const processos: object[] = [];
    try {
      for (const id of processId) {
        console.log(`Baixando processo com ID: ${id}`);
        const result = await controller.downloaderProcess(id, token);
        processos.push(result);
      }
      return processos;
    } catch (error) {
      console.error("Erro ao baixar processos:", error);
      throw error;
    }
  }
}
