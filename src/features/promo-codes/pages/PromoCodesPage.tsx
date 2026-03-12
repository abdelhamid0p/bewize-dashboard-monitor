/**
 * Promo Codes Page
 */

import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { Button } from "@/shared/components/atoms/button";
import { useTableExport } from "@/shared/hooks/useTableExport";
import { usePromoCodesTable } from "../hooks/usePromoCodesTable";
import {
  PROMO_CODES_COLUMNS,
  PROMO_CODES_FILTERS,
  renderPromoCodeCell,
} from "../config";

export const PromoCodesPage = () => {
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
  } = usePromoCodesTable({ pageSize: 20 });

  useTableExport({
    fileName: "codes-promo",
    sheetName: "Codes Promo",
    columns: PROMO_CODES_COLUMNS,
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
        filters={PROMO_CODES_FILTERS}
        onFilterChange={setFilter}
        actions={<Button variant="secondary">Créer un code promo</Button>}
      />

      <DataTable
        columns={PROMO_CODES_COLUMNS}
        data={data}
        renderCell={renderPromoCodeCell}
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
