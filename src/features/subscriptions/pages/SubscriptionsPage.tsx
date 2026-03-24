/**
 * Subscriptions Page
 */

import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { Button } from "@/shared/components/atoms/button";
import { useTableExport } from "@/shared/hooks/useTableExport";
import { useSubscriptionsTable } from "../hooks/useSubscriptionsTable";
import {
  SUBSCRIPTIONS_COLUMNS,
  SUBSCRIPTIONS_FILTERS,
  renderSubscriptionCell,
} from "../config";
import { useState } from "react";
import { CreateSubscriptionDialog } from "../create-subscription";
import { useCreateSubscription } from "../create-subscription/hooks";
import type { CreateManualSubscriptionRequest } from "../create-subscription/model/subscription.types";

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
  } = useSubscriptionsTable();
  const [openDialog, setOpenDialog] = useState(false);
  const { createSubscription, isLoading, errorMessage } =
    useCreateSubscription();

  const handleCreateSubscription = async (
    payload: CreateManualSubscriptionRequest,
  ) => {
    await createSubscription(payload).unwrap();
    setOpenDialog(false);
  };

  useTableExport({
    fileName: "abonnements",
    sheetName: "Abonnements",
    columns: SUBSCRIPTIONS_COLUMNS,
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
        filters={SUBSCRIPTIONS_FILTERS}
        onFilterChange={setFilter}
        actions={
          <Button variant="secondary" onClick={() => setOpenDialog(true)}>
            Créer un abonnement
          </Button>
        }
      />

      <CreateSubscriptionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={handleCreateSubscription}
        loading={isLoading}
        errorMessage={errorMessage}
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
