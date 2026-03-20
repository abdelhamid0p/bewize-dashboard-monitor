/**
 * Types for DataTable components
 * Pure type definitions - no logic
 */

import type { ReactNode } from "react";

/**
 * Column definition
 */
export interface Column {
  key: string;
  label: string;
  width?: string;
}

/**
 * Sort state
 */
export interface SortState {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * Filter option
 */
export interface FilterOption {
  label: string;
  value: string;
}

/**
 * Filter definition
 */
export interface FilterConfig {
  key: string;
  label: string;
  type?: "select" | "date-range";
  options?: FilterOption[];
  fromKey?: string;
  toKey?: string;
}

/**
 * DataTable props (pure UI)
 * Generic type T can be any object with an id property
 */
export interface DataTableProps<T extends { id: string | number }> {
  columns: Column[];
  data: T[];
  renderCell?: (item: T, columnKey: string) => ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

/**
 * Pagination props (pure UI)
 */
export interface PaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

/**
 * Toolbar props (pure UI)
 */
export interface ToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterConfig[];
  onFilterChange?: (key: string, value: string) => void;
  actions?: ReactNode;
}
