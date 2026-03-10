/**
 * Orders Page
 *
 * Assembles:
 * - Config (columns, filters, renderers)
 * - Logic (useOrdersTable hook)
 * - UI (DataTable, Pagination, Toolbar)
 */

import { DashboardNavbar } from "@/shared/components/molecules/dashboard_navbar";
import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { useOrdersTable } from "../hooks/useOrdersTable";
import {
  ORDERS_COLUMNS,
  ORDERS_FILTERS,
  renderOrderCell,
} from "../config";

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

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-[#FAFAFF] min-h-full">
      <DashboardNavbar userName="Commandes" />

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
