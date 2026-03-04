/**
 * Metrics mapper - transforms API response to UI format
 */

import type { MetricsApiResponse, MetricUI, MetricId } from '../model/metrics.types';

/**
 * Formats a growth percentage value to display string
 * @param growthPct - The growth percentage from API
 * @returns Formatted string like "+2.1%" or "-0.8%"
 */
export const formatGrowth = (growthPct: number): string => {
  const sign = growthPct > 0 ? '+' : '';
  return `${sign}${growthPct}%`;
};

/**
 * Determines trend direction from growth percentage
 * @param growthPct - The growth percentage from API
 * @returns 'up' for positive, 'down' for negative or zero
 */
export const getTrend = (growthPct: number): 'up' | 'down' => {
  return growthPct > 0 ? 'up' : 'down';
};

/**
 * Maps a single metric to UI format
 * @param id - Metric identifier
 * @param count - Metric count value
 * @param growthPct - Growth percentage
 */
export const mapMetricToUI = (
  id: MetricId,
  count: number,
  growthPct: number
): MetricUI => ({
  id,
  value: count,
  growth: formatGrowth(growthPct),
  trend: getTrend(growthPct),
});

/**
 * Maps the full API response to an array of UI metrics
 * @param response - API response from /dashboard/metrics
 * @returns Array of MetricUI objects
 */
export const mapMetricsResponseToUI = (response: MetricsApiResponse): MetricUI[] => {
  const metricIds: MetricId[] = ['students', 'orders', 'subscriptions'];
  
  return metricIds.map((id) => {
    const data = response[id];
    return mapMetricToUI(id, data.count, data.growthPct);
  });
};
