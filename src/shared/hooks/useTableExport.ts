import { useEffect, useCallback } from "react";
import { useExportContext } from "@/shared/context/ExportContext";
import { exportToExcel } from "@/shared/utils/exportToExcel";
import type { Column } from "@/shared/components/organisms/data-table";

interface UseTableExportOptions {
  fileName: string;
  sheetName: string;
  columns: Column[];
  data: Record<string, unknown>[];
}

/**
 * Hook that registers a data table export function with the ExportContext.
 * When the navbar's "Exporter" button is clicked, the table data is exported to Excel.
 */
export function useTableExport({
  fileName,
  sheetName,
  columns,
  data,
}: UseTableExportOptions) {
  const { registerExport } = useExportContext();

  const handleExport = useCallback(() => {
    const exportableColumns = columns.filter((col) => col.key !== "actions");

    exportToExcel(fileName, [
      {
        name: sheetName,
        headers: exportableColumns.map((col) => col.label),
        rows: data.map((item) =>
          exportableColumns.map((col) => {
            const value = item[col.key];
            return value != null ? String(value) : "";
          })
        ),
      },
    ]);
  }, [fileName, sheetName, columns, data]);

  useEffect(() => {
    return registerExport(handleExport);
  }, [registerExport, handleExport]);
}
