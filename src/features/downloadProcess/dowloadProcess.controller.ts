import { DownloadProcessService } from "./dowloadProcess.service.js";

export class DownloadProcessController {
  constructor(private service: DownloadProcessService) {}

  async fillOutWorksheet(file: Buffer): Promise<{ headers: string[]; dataRows: any[] }> {
    const result =await this.service.fillOutWorksheet(file);
    return result;
  }
}
