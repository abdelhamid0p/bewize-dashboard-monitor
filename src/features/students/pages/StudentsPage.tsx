/**
 * Students Page
 *
 * Simple page that assembles:
 * - Config (columns, filters, renderers)
 * - Logic (useStudentsTable hook)
 * - UI (DataTable, Pagination, Toolbar)
 */

import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { useTableExport } from "@/shared/hooks/useTableExport";
import { useStudentsTable } from "../hooks/useStudentsTable";
import {
  STUDENTS_COLUMNS,
  STUDENTS_FILTERS,
  renderStudentCell,
} from "../config";
import { FIXED_PAGE_SIZE } from "@/shared/components/organisms/data-table/Pagination";

export const StudentsPage = () => {
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
  } = useStudentsTable({ pageSize: FIXED_PAGE_SIZE });

  useTableExport({
    fileName: "etudiants",
    sheetName: "Étudiants",
    columns: STUDENTS_COLUMNS,
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
        filters={STUDENTS_FILTERS}
        onFilterChange={setFilter}
      />

      <DataTable
        columns={STUDENTS_COLUMNS}
        data={data}
        renderCell={renderStudentCell}
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
