import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

import AdmZip from 'adm-zip';
import { PDFDocument } from "pdf-lib";

interface IZipService {
  processoZipPdf : string;
}

export class ZipService {
  constructor() {}

  async padronizaProcesso(processo: IZipService, pasta: string): Promise<string> {
    console.log("PadronizaProcesso",processo)
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "temp-"));
    const temp = path.join(tempRoot, pasta);
    console.log("Pasta temp:", temp);
    await fs.mkdir(temp, {
      recursive: true,
    });
    console.log("Pasta criada");

    const base64Zip = processo.processoZipPdf;
    const zipBuffer = Buffer.from(base64Zip, "base64");
    const zip = new AdmZip(zipBuffer);
    zip.extractAllTo(tempRoot, true);

    const itens = await fs.readdir(tempRoot, { withFileTypes: true });

    for (const item of itens) {
      if (item.name.includes("Certidões")) {
        const certPath = path.join(tempRoot, item.name);
        const file = await fs.readdir(certPath, { withFileTypes: true });

        if (file.length === 1) {
          const fileName = file[0].name;
          await fs.rename(
            path.join(certPath, fileName),
            path.join(temp, "CNDs.pdf"),
          );
        }
        if (file.length > 1) {
          const merged = await PDFDocument.create();

          for (const pdfPath of file) {
            const bytes = await fs.readFile(path.join(certPath, pdfPath.name));
            const pdf = await PDFDocument.load(bytes);
            const pages = await merged.copyPages(pdf, pdf.getPageIndices());
            pages.forEach((p) => merged.addPage(p));
          }
          await fs.writeFile(path.join(temp, "CNDs.pdf"), await merged.save());
        }
      }

      if (item.name.includes("Xmls")) {
        const xmlPath = path.join(tempRoot, item.name);
        const file = await fs.readdir(xmlPath, { withFileTypes: true });

        if (file.length === 1) {
          const fileName = file[0].name;
          await fs.rename(
            path.join(xmlPath, fileName),
            path.join(temp, fileName),
          );
        }
      }

      if (item.name.includes("Processo")) {
        const procPath = path.join(tempRoot, item.name);
        await fs.rename(procPath, path.join(temp, "Processo.pdf"));
      }
    }
  
    return temp;
  }

  async zipProcesso(processos:string[]): Promise<Buffer>{
    const zip = new AdmZip();
    let cont = 1
    for(const processo of processos){
      console.log(`Add: ${processo}`)
      const nomepasta = path.basename(processo)
      // const nomepasta = await path.basename(processo)

      zip.addLocalFolder(processo, nomepasta);
      cont++
    }
    
    const buffer = zip.toBuffer() 

    console.log(`ZIP gerado: ${buffer.length} bytes`);

    for (const processo of processos) {
    await fs.rm(processo, {
      recursive: true,
      force: true,
    });
  }
    return buffer 
  }
}
