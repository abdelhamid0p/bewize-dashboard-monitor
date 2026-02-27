/**
 * Subscriptions Table Page
 *
 * Minimal page component that leverages the generic TablePage
 * with the subscriptions configuration.
 */

import { TablePage } from "@/features/tables/pages/TablePage";
import { useSubscriptionsTableData } from "../hooks/useSubscriptionsTableData";
import { SUBSCRIPTIONS_TABLE_CONFIG } from "../config/subscriptions.table.config";

export const SubscriptionsTablePage = () => {
  const tableState = useSubscriptionsTableData({
    pageSize: SUBSCRIPTIONS_TABLE_CONFIG.pageSize ?? 20,
  });

  return (
    <TablePage
      config={SUBSCRIPTIONS_TABLE_CONFIG}
      tableState={tableState}
      title="Les abonnements"
      showExport={true}
      showSettings={true}
    />
  );
};
