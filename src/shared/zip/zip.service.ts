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

  async padronizaProcesso(processo: IZipService): Promise<string> {

    const root = await fs.mkdtemp(path.join(os.tmpdir(), "root-"));
    const temp = await fs.mkdtemp(path.join(os.tmpdir(), "temp-"));

    const base64Zip = processo.processoZipPdf;
    const zipBuffer = Buffer.from(base64Zip, "base64");
    const zip = new AdmZip(zipBuffer);
    zip.extractAllTo(root, true);

    const itens = await fs.readdir(root, { withFileTypes: true });

    for (const item of itens) {
      if (item.name.includes("Certidões")) {
        const certPath = path.join(root, item.name);
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
        const xmlPath = path.join(root, item.name);
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
        const procPath = path.join(root, item.name);
        await fs.rename(procPath, path.join(temp, "Processo.pdf"));
      }
    }
    
    await fs.rm(root, {
      recursive: true,
      force: true,
    });

    return temp;
  }

  async zipProcesso(processos:string[]): Promise<Buffer>{
    const zip = new AdmZip();
    let cont = 1
    for(const processo of processos){
      console.log(`Add: ${processo}`)
      const nomepasta = `Processo_${cont}`
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
