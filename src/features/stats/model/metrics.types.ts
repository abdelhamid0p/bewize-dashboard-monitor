/**
 * Types for the Dashboard Metrics API
 * GET /dashboard/metrics
 */

/**
 * Single metric data from API
 */
export interface MetricData {
  count: number;
  growthPct: number;
}

/**
 * API Response structure for /dashboard/metrics
 */
export interface MetricsApiResponse {
  students: MetricData;
  orders: MetricData;
  subscriptions: MetricData;
}

/**
 * Metric IDs available in the dashboard
 */
export type MetricId = 'students' | 'orders' | 'subscriptions';

/**
 * UI representation of a single metric
 */
export interface MetricUI {
  id: MetricId;
  value: number;
  growth: string;
  trend: 'up' | 'down';
}
