import { TablePage } from "@/features/tables/pages/TablePage";
import { PROMO_CODES_TABLE_CONFIG } from "../config/promo-codes.table.config";
import { useDiscountsTableData } from "../hooks/useDiscountsTableData";

export const PromoCodesTablePage = () => {
  const tableState = useDiscountsTableData({
    pageSize: PROMO_CODES_TABLE_CONFIG.pageSize ?? 20,
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
