import { DownloadProcessService, Table } from "./dowloadProcess.service.js";

export class DownloadProcessController {
  constructor(private service: DownloadProcessService) {}

  async fillOutWorksheet(file: Buffer): Promise<Table> {
    const result = await this.service.fillOutWorksheet(file);
    return result;
  }

  async downloaderProcesses(processId:number[], token:string){
    const result = await this.service.downloaderProcesses(processId,token)
    return result
  }
}
