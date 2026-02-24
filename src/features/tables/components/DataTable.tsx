/**
 * Generic DataTable component
 * Displays data in a table format with pagination controls
 */

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/atoms/data-table/data_table";
import { cn } from "@/shared/lib/utils";
import type { TableConfig, UseTableDataResult } from "../types";

interface GenericDataTableProps<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
> {
  /** Table configuration */
  config: TableConfig<TBackend, TUI, TFilters>;

  /** Data state and handlers from useTableData hook */
  tableState: UseTableDataResult<TUI, TFilters>;
}

export function GenericDataTable<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
>({ config, tableState }: GenericDataTableProps<TBackend, TUI, TFilters>) {
  const { data, loading, error, pagination, goToPage, sort, toggleSort } =
    tableState;
  const { currentPage = pagination.page, totalPages = pagination.totalPages } =
    pagination as any;

  // Loading state
  if (loading) {
    return (
      <div className="p-6 text-center text-neutral-500">Chargement...</div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  // Render table with pagination
  return (
    <div className="space-y-4">
      <DataTable
        columns={config.columns}
        data={data}
        renderCell={
          config.renderCell
            ? (item, key) => config.renderCell!(item, key)
            : undefined
        }
        sort={sort}
        onSort={toggleSort}
      />

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-sm text-neutral-500">Page</span>
        <span className="text-sm text-neutral-400">-</span>

        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={pagination.page === 0}
          onClick={() => goToPage(pagination.page - 1)}
        >
          ←
        </Button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = pagination.page < 3 ? i : pagination.page - 2 + i;
          if (page >= totalPages) return null;
          return (
            <Button
              key={page}
              size="sm"
              onClick={() => goToPage(page)}
              className={cn(
                "rounded-full w-7 h-7 p-0 text-xs",
                pagination.page === page
                  ? "bg-primary-500 hover:bg-primary-600 text-white"
                  : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50",
              )}
            >
              {page + 1}
            </Button>
          );
        })}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={pagination.page === totalPages - 1}
          onClick={() => goToPage(pagination.page + 1)}
        >
          →
        </Button>

        <span className="text-sm text-neutral-400">-</span>
        <span className="text-sm text-neutral-500">
          {pagination.totalElements}
        </span>
      </div>
    </div>
  );
}
