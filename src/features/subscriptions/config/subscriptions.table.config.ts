/**
 * Subscriptions Table Configuration
 *
 * This configuration defines:
 * - What columns to display
 * - How to fetch data from the API
 * - How to transform backend data to UI format
 * - Custom cell rendering
 */

import type { Subscription } from "@/shared/types/subscriptions.types";
import type { TableConfig } from "@/features/tables/types";
import { SUBSCRIPTIONS_TABLE_COLUMNS } from "./subscriptions.table.columns";
import { SUBSCRIPTIONS_TABLE_FILTERS } from "./subscriptions.table.filters";
import { renderSubscriptionCell } from "./subscriptions.table.render-cell";
import type { SubscriptionRow, SubscriptionsTableFilters } from "../types";

/**
 * Complete table configuration for Subscriptions
 * Fetches from /subscriptions endpoint with subscription data
 * This is the single source of truth for the subscriptions table
 */
const EMPTY_RESPONSE = {
  data: [],
  meta: {
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  },
};

export const SUBSCRIPTIONS_TABLE_CONFIG: TableConfig<
  Subscription,
  SubscriptionRow,
  SubscriptionsTableFilters
> = {
  // Basic configuration
  entityName: "Subscriptions",
  tableId: "subscriptions-table",
  pageSize: 20,

  // Column definitions
  columns: SUBSCRIPTIONS_TABLE_COLUMNS,

  // Filter configuration
  filters: SUBSCRIPTIONS_TABLE_FILTERS,

  // Searchable fields
  searchKeys: ["id", "orderId"],

  /**
   * API Fetcher
   * Calls the subscriptions API with pagination
   */
  fetcher: async () => EMPTY_RESPONSE,

  /**
   * Data Mapper
   * Transforms raw backend data to UI display format
   */
  mapper: (subscription: Subscription) => ({
    ...subscription,
  } as SubscriptionRow),

  /**
   * Custom cell renderer
   * Handles special rendering for certain columns (status, actions)
   */
  renderCell: renderSubscriptionCell,
};
