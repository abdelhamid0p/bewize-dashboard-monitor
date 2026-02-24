import { TablePage } from "@/features/tables/pages/TablePage";
import { PROMO_CODES_TABLE_CONFIG } from "../config/promo-codes.table.config";
import { useOrdersTableData } from "@/features/orders/application/useOrdersTableData";
import {
  buildPromoCodesOrdersQueryParams,
  mapOrdersToPromoCodesRows,
  type PromoCodeRow,
  type PromoCodesOrdersFilters,
} from "../adapters/mapOrdersToPromoCodesRows";

export const PromoCodesTablePage = () => {
  const tableState = useOrdersTableData<PromoCodeRow, PromoCodesOrdersFilters>({
    pageSize: PROMO_CODES_TABLE_CONFIG.pageSize ?? 20,
    mapRows: mapOrdersToPromoCodesRows,
    toQueryParams: buildPromoCodesOrdersQueryParams,
  });

  return (
    <TablePage
      config={PROMO_CODES_TABLE_CONFIG}
      tableState={tableState}
      title="Les codes promo"
      showExport={true}
      showSettings={true}
    />
  );
};
