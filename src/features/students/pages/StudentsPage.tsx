/**
 * Students Page
 *
 * Simple page that assembles:
 * - Config (columns, filters, renderers)
 * - Logic (useStudentsTable hook)
 * - UI (DataTable, Pagination, Toolbar)
 */

import { DashboardNavbar } from "@/shared/components/molecules/dashboard_navbar";
import {
  DataTable,
  Pagination,
  Toolbar,
} from "@/shared/components/organisms/data-table";
import { useStudentsTable } from "../hooks/useStudentsTable";
import {
  STUDENTS_COLUMNS,
  STUDENTS_FILTERS,
  renderStudentCell,
} from "../config";

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
  } = useStudentsTable({ pageSize: 10 });

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 bg-[#FAFAFF]">
      <DashboardNavbar userName="John Doe" />

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
