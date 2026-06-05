import { DownloadProcessService, Table } from "./dowloadProcess.service.js";

export class DownloadProcessController {
  constructor(private service: DownloadProcessService) {}

  async fillOutWorksheet(file: Buffer): Promise<Table> {
    const result = await this.service.fillOutWorksheet(file);
    return result;
  }
}
