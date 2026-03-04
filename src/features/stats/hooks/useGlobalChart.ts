import { useMemo } from 'react';
import { useStudentsChart } from './useStudentsChart';
import { useOrdersChart } from './useOrdersChart';
import { useSubscriptionsChart } from './useSubscriptionsChart';

/**
 * UI representation for global chart (multiple datasets)
 */
export interface GlobalChartUI {
  labels: string[];
  datasets: number[][];
}

/**
 * Hook for combining all 3 charts into a global view
 * Reuses existing hooks - respects DRY principle
 */
export function useGlobalChart(year?: number, month?: number) {
  const students = useStudentsChart(year, month);
  const orders = useOrdersChart(year, month);
  const subscriptions = useSubscriptionsChart(year, month);

  const isLoading = students.isLoading || orders.isLoading || subscriptions.isLoading;
  const isError = students.isError || orders.isError || subscriptions.isError;

  const chart: GlobalChartUI | undefined = useMemo(() => {
    if (!students.chart || !orders.chart || !subscriptions.chart) {
      return undefined;
    }

    return {
      labels: students.chart.labels, // Same labels for all
      datasets: [
        students.chart.data,
        orders.chart.data,
        subscriptions.chart.data,
      ],
    };
  }, [students.chart, orders.chart, subscriptions.chart]);

  return {
    chart,
    isLoading,
    isError,
  };
}
