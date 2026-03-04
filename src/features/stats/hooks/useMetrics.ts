import { useMemo } from 'react';
import { useGetMetricsQuery } from '../api/metricsApi';
import { mapMetricsResponseToUI } from '../config/metrics_mapper';
import type { MetricUI } from '../model/metrics.types';

/**
 * Hook for fetching and transforming dashboard metrics
 * Uses RTK Query for data fetching with caching and auto-refetch
 * 
 * @returns Object containing metrics data, loading state, and error
 */
export function useMetrics() {
  const { data, isLoading, isError, error, refetch } = useGetMetricsQuery();

  const metrics: MetricUI[] | undefined = useMemo(() => {
    if (!data) return undefined;
    return mapMetricsResponseToUI(data);
  }, [data]);

  return {
    metrics,
    isLoading,
    isError,
    error,
    refetch,
  };
}
