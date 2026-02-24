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

import type { Order } from "@/features/orders/domain/entities/order";
import type { TableConfig } from "@/features/tables/types";
import { STUDENTS_TABLE_COLUMNS } from "./students.table.columns";
import { STUDENTS_TABLE_FILTERS } from "./students.table.filters";
import { renderStudentCell } from "./students.table.render-cell";
import {
  mapOrderToStudentRow,
  type StudentRow,
  type StudentsOrdersFilters,
} from "../adapters/mapOrdersToStudentsRows";

/**
 * Gender configuration for display
 */
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
  Order,
  StudentRow,
  StudentsOrdersFilters
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
  searchKeys: ["name", "phone", "subscriptionType", "planType"],

  /**
   * API Fetcher
   * Not used when Redux tableState is provided
   */
  fetcher: async () => EMPTY_RESPONSE,

  /**
   * Data Mapper
   * Transforms raw backend data to UI display format
   */
  mapper: (order: Order) => {
    const result = mapOrderToStudentRow(order);
    return result || ({} as StudentRow);
  },

  /**
   * Custom cell renderer
   * Handles special rendering for certain columns
   */
  renderCell: renderStudentCell,
};
