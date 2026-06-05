import * as xlsx from "xlsx";

export const xlxsParseJson = async (file: Buffer) => {
  const workbook = xlsx.read(file, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json<string[]>(worksheet, {
    header: 1,
    raw: false,
  });

  const headers = jsonData[0].map((h) => h.trim());
  const dataRows = jsonData.slice(1);

  return { headers, dataRows };
};
