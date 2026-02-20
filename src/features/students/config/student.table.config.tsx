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

import { fetchStudents } from "../api/students_api";
import type { StudentBackend, StudentUI, StudentsFilters } from "../model";
import type { TableConfig } from "@/features/tables/types";
import { STUDENTS_TABLE_COLUMNS } from "./students.table.columns";
import { STUDENTS_TABLE_FILTERS } from "./students.table.filters";
import { CYCLE_CONFIG, GENDER_CONFIG } from "./students.table.enums";
import { mapStudentToUI } from "./students.table.mapper";
import { renderStudentCell } from "./students.table.render-cell";

/**
 * Gender configuration for display
 */
/**
 * Complete table configuration for Students
 * This is the single source of truth for the students table
 */
export const STUDENTS_TABLE_CONFIG: TableConfig<
  StudentBackend,
  StudentUI,
  StudentsFilters
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
  searchKeys: ["name", "cne", "email", "phone"],

  // Enums for reference (optional)
  enums: {
    GENDER: GENDER_CONFIG,
    CYCLE: CYCLE_CONFIG,
  },

  /**
   * API Fetcher
   * Calls the students API with filters
   */
  fetcher: async (filters: StudentsFilters) => fetchStudents(filters),

  /**
   * Data Mapper
   * Transforms raw backend data to UI display format
   */
  mapper: mapStudentToUI,

  /**
   * Custom cell renderer
   * Handles special rendering for certain columns
   */
  renderCell: renderStudentCell,
};
