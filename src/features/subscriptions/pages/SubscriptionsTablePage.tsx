/**
 * Subscriptions Table Page
 *
 * Minimal page component that leverages the generic TablePage
 * with the subscriptions configuration.
 *
 * All business logic (fetching, filtering, rendering) is handled
 * by the generic TablePage and configuration.
 */

import { TablePage } from "@/features/tables/pages/TablePage";
import { useOrdersTableData } from "@/features/orders/application/useOrdersTableData";
import { SUBSCRIPTIONS_TABLE_CONFIG } from "../config/subscriptions.table.config";
import {
  buildSubscriptionsOrdersQueryParams,
  mapOrdersToSubscriptionsRows,
  type SubscriptionRow,
  type SubscriptionsOrdersFilters,
} from "../adapters/mapOrdersToSubscriptionsRows";

export const SubscriptionsTablePage = () => {
  const tableState = useOrdersTableData<
    SubscriptionRow,
    SubscriptionsOrdersFilters
  >({
    pageSize: SUBSCRIPTIONS_TABLE_CONFIG.pageSize ?? 20,
    mapRows: mapOrdersToSubscriptionsRows,
    toQueryParams: buildSubscriptionsOrdersQueryParams,
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
