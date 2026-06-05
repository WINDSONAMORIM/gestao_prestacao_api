import * as xlsx from "xlsx";

interface ParsedTable<T>{
  headers: string[];
  data: T[]
}

export const xlxsParseJson = async <T> (
  file: Buffer
) : Promise <ParsedTable<T>>=> {
  const workbook = xlsx.read(file, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json<string[]>(worksheet, {
    header: 1,
    raw: false,
  });

  const headers = jsonData[0].map((h) => h.trim());
  const dataRows = jsonData.slice(1);

  const data = dataRows.map((row) =>
    headers.reduce((acc, header, index) => {
      (acc as Record<string, string>)[header] = row[index] ?? "";
      return acc;
    }, {} as T)
  );

  return {headers, data};
};