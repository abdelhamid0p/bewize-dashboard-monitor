/**
 * Student Table Configuration
 *
 * This configuration defines:
 * - What columns to display
 * - How to fetch data from the API
 * - How to transform backend data to UI format
 * - Custom cell rendering
 * - Available filters
 */

import type { Student } from "@/shared/types/students.types";
import type { TableConfig } from "@/features/tables/types";
import { STUDENTS_TABLE_COLUMNS } from "./students.table.columns";
import { STUDENTS_TABLE_FILTERS } from "./students.table.filters";
import { renderStudentCell } from "./students.table.render-cell";
import type { StudentRow, StudentsTableFilters } from "../types";

/**
 * Complete table configuration for Students
 * This is the single source of truth for the students table
 */
const EMPTY_RESPONSE = {
  data: [],
  meta: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
};

export const STUDENTS_TABLE_CONFIG: TableConfig<
  Student,
  StudentRow,
  StudentsTableFilters
> = {
  // Basic configuration
  entityName: "Students",
  tableId: "students-table",
  pageSize: 10,

  // Column definitions
  columns: STUDENTS_TABLE_COLUMNS,

  // Filter configuration (optional)
  filters: STUDENTS_TABLE_FILTERS,

  // Searchable fields
  searchKeys: ["firstName", "lastName", "email"],

  /**
   * API Fetcher
   * Not used when Redux tableState is provided
   */
  fetcher: async () => EMPTY_RESPONSE,

  /**
   * Data Mapper
   * Transforms raw backend data to UI display format
   */
  mapper: (student: Student) => ({
    ...student,
  } as StudentRow),

  /**
   * Custom cell renderer
   * Handles special rendering for certain columns
   */
  renderCell: renderStudentCell,
};
