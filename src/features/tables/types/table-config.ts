/**
 * Core types for table configuration
 * Defines the contract for all table configs across the application
 */

/**
 * Core types for table configuration
 * Defines the contract for all table configs across the application
 */
import type { ReactNode } from "react";

/**
 * Pagination metadata from backend
 */
export interface PaginationMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * Generic paginated API response structure
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Column definition for table rendering
 */
export interface TableColumn {
  /** Unique key to identify the column and match data */
  key: string;
  /** Display label in table header */
  label: string;
  /** Optional: width of the column */
  width?: string;
  /** Optional: CSS class for styling */
  className?: string;
  /** Optional: whether this column is sortable */
  sortable?: boolean;
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Type of filter (select, checkbox, date, etc.) */
  type: "select" | "checkbox" | "date" | "text";
  /** Options for select/checkbox filters */
  options?: { label: string; value: string }[];
}

/**
 * Main table configuration type
 * This is what each entity (Students, Teachers, etc.) must implement
 */
export interface TableConfig<
  TBackend = any, // Raw backend response type
  TUI = any, // Transformed UI display type
  TFilters extends Record<string, any> = Record<string, any> // Filters type
> {
  /** Display name of the entity */
  entityName: string;

  /** Unique identifier for the table */
  tableId: string;

  /** Column definitions */
  columns: TableColumn[];

  /** Filter configuration */
  filters?: FilterConfig[];

  /** Keys used for search (which fields are searchable) */
  searchKeys?: (keyof TUI)[];

  /** Default page size for pagination */
  pageSize?: number;

  /**
   * API fetcher function
   * Must return a PaginatedResponse
   */
  fetcher: (filters: TFilters) => Promise<PaginatedResponse<TBackend>>;

  /**
   * Mapper function to transform backend response to UI format
   * Takes raw backend data and transforms it for display
   */
  mapper: (backendData: TBackend) => TUI;

  /**
   * Cell renderer for custom column rendering
   * If not provided, default string rendering is used
   */
  renderCell?: (item: TUI, columnKey: string) => ReactNode;

  /**
   * Optional: Configuration enums/constants for display (like gender, status, etc.)
   */
  enums?: Record<string, Record<string, any>>;
}

/**
 * Props for the generic TablePage component
 */
export interface TablePageProps<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>
> {
  /** Table configuration */
  config: TableConfig<TBackend, TUI, TFilters>;

  /** Optional: Override table state (used for Redux-powered tables) */
  tableState?: UseTableDataResult<TUI, TFilters>;

  /** Initial filters to apply */
  initialFilters?: Partial<TFilters>;

  /** Page header title */
  title: string;

  /** Optional: Show export button */
  showExport?: boolean;

  /** Optional: Show settings button */
  showSettings?: boolean;

  /** Optional: Custom actions in header */
  headerActions?: ReactNode;
}

/**
 * Single sort criterion
 */
export interface SortCriterion {
  field: string;
  direction: "asc" | "desc";
}

/**
 * State and helpers returned by useTableData hook
 */
export interface UseTableDataResult<TUI, TFilters extends Record<string, any>> {
  /** Transformed data to display in table */
  data: TUI[];

  /** Loading state */
  loading: boolean;

  /** Error state */
  error: Error | null;

  /** Current pagination info */
  pagination: PaginationMeta;

  /** Current filters applied */
  filters: TFilters;

  /** Search term */
  searchTerm: string;

  /** Current sort criteria (array for multi-sort) */
  sort: SortCriterion[];

  /** Update filters and reset to page 0 */
  updateFilters: (newFilters: Partial<TFilters>) => void;

  /** Paginate to a specific page */
  goToPage: (page: number) => void;

  /** Update search term and reset to page 0 */
  setSearchTerm: (term: string) => void;

  /** Toggle sort on a column (add to sort criteria or remove/toggle direction) */
  toggleSort: (field: string) => void;

  /** Clear all sort criteria */
  clearSort: () => void;
}
