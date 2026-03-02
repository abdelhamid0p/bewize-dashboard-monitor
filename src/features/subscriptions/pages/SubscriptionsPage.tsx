/**
 * Subscriptions Page
 */

import { DashboardNavbar } from "@/shared/components/molecules/dashboard_navbar";
import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { Button } from "@/shared/components/atoms/button";
import { useSubscriptionsTable } from "../hooks/useSubscriptionsTable";
import {
  SUBSCRIPTIONS_COLUMNS,
  SUBSCRIPTIONS_FILTERS,
  renderSubscriptionCell,
} from "../config";

export const SubscriptionsPage = () => {
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
  } = useSubscriptionsTable({ pageSize: 20 });

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 bg-[#FAFAFF]">
      <DashboardNavbar userName="Abonnements" />

      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={SUBSCRIPTIONS_FILTERS}
        onFilterChange={setFilter}
        actions={<Button variant="secondary">Créer un abonnement</Button>}
      />

      <DataTable
        columns={SUBSCRIPTIONS_COLUMNS}
        data={data}
        renderCell={renderSubscriptionCell}
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
