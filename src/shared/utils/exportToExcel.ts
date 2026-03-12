import * as XLSX from "xlsx";

export interface ExportSheet {
  name: string;
  headers: string[];
  rows: (string | number)[][];
}

/**
 * Export one or more sheets to an Excel (.xlsx) file and trigger download.
 */
export function exportToExcel(fileName: string, sheets: ExportSheet[]) {
  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    const data = [sheet.headers, ...sheet.rows];
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Auto-size columns based on content
    const colWidths = sheet.headers.map((header, colIndex) => {
      const maxLen = Math.max(
        header.length,
        ...sheet.rows.map((row) => String(row[colIndex] ?? "").length)
      );
      return { wch: Math.min(maxLen + 2, 50) };
    });
    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name.slice(0, 31));
  }

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
