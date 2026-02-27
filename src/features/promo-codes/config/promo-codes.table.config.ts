import type { Order } from "@/shared/types/orders.types";

import type { TableConfig } from "@/features/tables/types";
import { PROMO_CODES_TABLE_COLUMNS } from "./promo-codes.table.columns";
import { PROMO_CODES_TABLE_FILTERS } from "./promo-codes.table.filters";
import { renderPromoCodeCell } from "./promo-codes.table.render-cell";
import {
  mapOrderToPromoCodeRow,
  type PromoCodeRow,
  type PromoCodesOrdersFilters,
} from "../adapters/mapOrdersToPromoCodesRows";

const EMPTY_RESPONSE = {
  data: [],
  meta: {
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  },
};

export const PROMO_CODES_TABLE_CONFIG: TableConfig<
  Order,
  PromoCodeRow,
  PromoCodesOrdersFilters
> = {
  entityName: "PromoCodes",
  tableId: "promo-codes-table",
  pageSize: 20,
  columns: PROMO_CODES_TABLE_COLUMNS,
  filters: PROMO_CODES_TABLE_FILTERS,
  searchKeys: ["code", "percentage", "status"],
  fetcher: async () => EMPTY_RESPONSE,
  mapper: (order: Order) => mapOrderToPromoCodeRow(order) || {} as PromoCodeRow,
  renderCell: renderPromoCodeCell,
};
