import { DownloadProcessService} from "./dowloadProcess.service.js";
import { Processo, Table } from "./dowloadProcess.types.js";

export class DownloadProcessController {
  constructor(private service: DownloadProcessService) {}

  async fillOutWorksheet(file: Buffer): Promise<Table> {
    const result = await this.service.fillOutWorksheet(file);
    return result;
  }

  async downloaderProcesses(processos: Processo[], token:string){
    const result = await this.service.downloaderProcesses(processos,token)
    return result
  }
}
