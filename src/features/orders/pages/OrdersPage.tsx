/**
 * Orders Page
 *
 * Assembles:
 * - Config (columns, filters, renderers)
 * - Logic (useOrdersTable hook)
 * - UI (DataTable, Pagination, Toolbar)
 */

import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { useTableExport } from "@/shared/hooks/useTableExport";
import { useOrdersTable } from "../hooks/useOrdersTable";
import { ORDERS_COLUMNS, ORDERS_FILTERS, renderOrderCell } from "../config";

export const OrdersPage = () => {
  const {
    data,
    loading,
    error,
    pagination,
    searchTerm,
    setSearchTerm,
    setFilter,
    goToPage,
    setPageSize,
  } = useOrdersTable({ pageSize: 20 });

  useTableExport({
    fileName: "commandes",
    sheetName: "Commandes",
    columns: ORDERS_COLUMNS,
    data: data as unknown as Record<string, unknown>[],
  });

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-[#FAFAFF] min-h-full">
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={ORDERS_FILTERS}
        onFilterChange={setFilter}
      />

      <DataTable
        columns={ORDERS_COLUMNS}
        data={data}
        renderCell={renderOrderCell}
        loading={loading}
      />

      <Pagination
        pagination={pagination}
        onPageChange={goToPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};
