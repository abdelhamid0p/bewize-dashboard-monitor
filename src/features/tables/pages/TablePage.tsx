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
import { DashboardNavbar } from "@/components/molecules/dashboard_navbar";

export function TablePage<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
>({
  config,
  tableState: tableStateOverride,
  initialFilters = {},
  title,
  showExport = true,
  showSettings = true,
  headerActions,
}: TablePageProps<TBackend, TUI, TFilters>) {
  // Initialize table data management
  const tableState = tableStateOverride ?? useTableData(config, initialFilters);

  return (
    <div className="p-6 space-y-4 bg-[#FAFAFF]">
      {/* Header (à changer par le components navbar) */}
      <DashboardNavbar userName="John Doe" />
      {/* Search and filters toolbar */}
      <TableToolbar config={config} tableState={tableState} />

      {/* Data table with pagination */}
      <GenericDataTable config={config} tableState={tableState} />
    </div>
  );
}
