/**
 * Generic TablePage component
 * This is the main component that any entity page (Students, Teachers, etc.) can use
 *
 * It handles:
 * - Page layout and header
 * - Search and filter toolbar
 * - Data table with pagination
 * - Loading and error states
 */

import { Download, Settings2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { GenericDataTable } from "../components/DataTable";
import { TableToolbar } from "../components/TableToolbar";
import { useTableData } from "../hooks/useTableData";
import type { TablePageProps } from "../types";

export function TablePage<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
>({
  config,
  initialFilters = {},
  title,
  showExport = true,
  showSettings = true,
  headerActions,
}: TablePageProps<TBackend, TUI, TFilters>) {
  // Initialize table data management
  const tableState = useTableData(config, initialFilters);

  return (
    <div className="p-6 space-y-4">
      {/* Header with title and action buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        <div className="flex items-center gap-3">
          {showExport && (
            <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          )}
          {showSettings && (
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full border-neutral-300"
            >
              <Settings2 className="h-4 w-4 text-neutral-600" />
            </Button>
          )}
          {headerActions}
        </div>
      </div>

      {/* Search and filters toolbar */}
      <TableToolbar config={config} tableState={tableState} />

      {/* Data table with pagination */}
      <GenericDataTable config={config} tableState={tableState} />
    </div>
  );
}
