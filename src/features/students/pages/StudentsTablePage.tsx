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
import { STUDENTS_TABLE_CONFIG } from "../config/student.table.config";

export const StudentsTablePage = () => {
  return (
    <TablePage
      config={STUDENTS_TABLE_CONFIG}
      title="Les étudiants"
      showExport={true}
      showSettings={true}
    />
  );
};
