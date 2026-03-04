/**
 * Types for Dashboard Charts API
 * Shared types for all chart endpoints (subscriptions, orders, students)
 */

/**
 * Single data point in a chart
 */
export interface ChartPoint {
  label: string;
  count: number;
}

/**
 * API Response structure for chart endpoints
 * GET /dashboard/subscriptions, /dashboard/orders, /dashboard/students
 */
export interface ChartApiResponse {
  points: ChartPoint[];
  total: number;
}

/**
 * Query parameters for chart endpoints
 */
export interface ChartQueryParams {
  year: number;
  month?: number;
}

/**
 * UI representation for chart data
 */
export interface ChartUI {
  labels: string[];
  data: number[];
  total: number;
}
