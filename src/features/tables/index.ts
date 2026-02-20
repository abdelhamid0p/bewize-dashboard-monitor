/**
 * Central exports for the tables feature
 * 
 * This module provides everything needed to create and use tables
 */

// === Components ===
export { TablePage } from "./pages/TablePage";
export { GenericDataTable } from "./components/DataTable";
export { TableToolbar } from "./components/TableToolbar";

// === Hooks ===
export { useTableData } from "./hooks/useTableData";

// === Types ===
export type {
  TableConfig,
  TablePageProps,
  TableColumn,
  FilterConfig,
  PaginationMeta,
  PaginatedResponse,
  UseTableDataResult,
} from "./types";
