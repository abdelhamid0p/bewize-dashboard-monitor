import { useMemo } from 'react';
import { useGetSubscriptionsChartQuery } from '../api/subscriptionsChartApi';
import { mapChartResponseToUI } from '../config/chart_mapper';
import type { ChartUI } from '../model/chart.types';

// TODO: Replace with dynamic values from date input
const DEFAULT_YEAR = 2025;
const DEFAULT_MONTH = 3;

/**
 * Hook for fetching subscriptions chart data
 * Uses RTK Query with caching and auto-refetch
 */
export function useSubscriptionsChart(year = DEFAULT_YEAR, month = DEFAULT_MONTH) {
  const { data, isLoading, isError, error, refetch } = useGetSubscriptionsChartQuery({
    year,
    month,
  });

  const chart: ChartUI | undefined = useMemo(() => {
    if (!data) return undefined;
    return mapChartResponseToUI(data);
  }, [data]);

  return {
    chart,
    isLoading,
    isError,
    error,
    refetch,
  };
}
