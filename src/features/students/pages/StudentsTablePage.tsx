/**
 * Students Table Page
 *
 * After refactoring, the page is extremely simple:
 * 1. Import the table config
 * 2. Use the students hook for data fetching
 * 3. Render the generic TablePage with the config
 */

import { TablePage } from "@/features/tables/pages/TablePage";
import { useStudentsTableData } from "../hooks/useStudentsTableData";
import { STUDENTS_TABLE_CONFIG } from "../config/student.table.config";

export const StudentsTablePage = () => {
  const tableState = useStudentsTableData({
    pageSize: STUDENTS_TABLE_CONFIG.pageSize ?? 10,
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
