/**
 * Students Table Page
 *
 * After refactoring, the page is extremely simple:
 * 1. Import the table config
 * 2. Render the generic TablePage with the config
 *
 * That's it! All the logic (fetching, filtering, searching, rendering)
 * is now centralized in the generic TablePage and configuration.
 */

import { TablePage } from "@/features/tables/pages/TablePage";
import { useOrdersTableData } from "@/features/orders/application/useOrdersTableData";
import { STUDENTS_TABLE_CONFIG } from "../config/student.table.config";
import {
  buildStudentsOrdersQueryParams,
  mapOrdersToStudentsRows,
  type StudentRow,
  type StudentsOrdersFilters,
} from "../adapters/mapOrdersToStudentsRows";

export const StudentsTablePage = () => {
  const tableState = useOrdersTableData<StudentRow, StudentsOrdersFilters>({
    pageSize: STUDENTS_TABLE_CONFIG.pageSize ?? 10,
    mapRows: mapOrdersToStudentsRows,
    toQueryParams: buildStudentsOrdersQueryParams,
  });

  return (
    <TablePage
      config={STUDENTS_TABLE_CONFIG}
      tableState={tableState}
      title="Les étudiants"
      showExport={true}
      showSettings={true}
    />
  );
};
