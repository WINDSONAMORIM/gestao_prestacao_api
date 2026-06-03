import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

import AdmZip from 'adm-zip';
import { PDFDocument } from "pdf-lib";

export class ZipService {
    constructor(private processo: any) {}
    
    async padronizaProcesso(): Promise<void> {
        const root = await fs.mkdtemp(path.join(os.tmpdir(), "proc-"));
        const temp = await fs.mkdtemp(path.join(os.tmpdir(), "proc-"));

        const base64Zip = await this.processo.processoZipPdf;
        const zipBuffer = Buffer.from(base64Zip, 'base64');
        const zip = new AdmZip(zipBuffer);
        zip.extractAllTo(root, true);

        const itens = await fs.readdir(root, { withFileTypes: true });
        
        for (const item of itens) {
            
            if (item.name.includes("Certidões")) {
                const certPath = path.join(root, item.name)
                const file = await fs.readdir(certPath,{withFileTypes:true})
                
                if(file.length === 1){
                    const fileName = file[0].name
                    await fs.rename(path.join(certPath,fileName),path.join(temp,"CNDs.pdf"))
                }
                if(file.length > 1){
                    const merged = await PDFDocument.create();

                    for (const pdfPath of file) {
                        const bytes = await fs.readFile(pdfPath.name);
                        const pdf = await PDFDocument.load(bytes);
                        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
                        pages.forEach(p => merged.addPage(p));
                    }
                    await fs.writeFile(
                    path.join(temp, "CNDs.pdf"),
                    await merged.save()
                    );
                }
            }

            if(item.name.includes("Xmls")){
                const xmlPath = path.join(root, item.name)
                const file = await fs.readdir(xmlPath,{withFileTypes:true})
                
                if(file.length === 1){
                    const fileName = file[0].name
                    await fs.rename(path.join(xmlPath,fileName),path.join(temp,fileName))
                }
            } 
        }
        const conteudo = await fs.readdir(temp);
        console.log("Conteúdo do temp:", conteudo);
    }           
}
