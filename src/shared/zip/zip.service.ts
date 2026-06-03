// import os from "node:os";
// import path from "node:path";
// import fs from "node:fs/promises";

// import AdmZip from 'adm-zip';

// export class ZipService {
//     constructor(private processo: any) {}
    
//     async padronizaProcesso(): Promise<void> {
//         const root = await fs.mkdtemp(path.join(os.tmpdir(), "proc-"));

//         const base64Zip = await this.processo.processoZipPdf;
//         const zipBuffer = Buffer.from(base64Zip, 'base64');
//         const zip = new AdmZip(zipBuffer);
//         zip.extractAllTo(root, true);

//         const itens = await fs.readdir(root, { withFileTypes: true });

//         for (const item of itens) {
//             if (item.isDirectory()) continue;
//             if (item.name.includes("Certidão")) {
//                 await this.mergePdfs(zipEntry.entryName);
//               }
//                 if (
//                   item.name.includes("Pedido") ||
//                   item.name.includes("Cotação")
//                 ) {
//                   continue;
//                 }  
//         }
//     }           
    
//     async mergePdfs(processo: string): Promise<void> {
//         if (processo.length === 0) return
//         if (processo.length === 1) {
//             await fs.rename(path.join(dir, pdfs[0]), destino);
//             return;
//           }
        
//         const merged = await PDFDocument.create();

//         for (const pdfFile of processo) {
//             const bytes = await fs.readFile(path.join(dir, pdfFile));
//             const pdf = await PDFDocument.load(bytes);
//             const pages = await merged.copyPages(pdf, pdf.getPageIndices());
//             pages.forEach((p) => merged.addPage(p));
//         }

//         const finalBytes = await merged.save();
//         await fs.writeFile(destino, finalBytes);  
//     }
// }
