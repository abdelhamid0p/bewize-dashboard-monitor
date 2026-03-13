import { useMemo } from "react";
import { useGetDashboardQuery } from "../api/metricsApi";
import { STATS_CONFIG } from "../config/stats_config";
import type { DashboardStatUI } from "../model/stats_types";
import type { DashboardChartUI } from "../model/stats_chart_type";

export interface DashboardUI {
  stats: DashboardStatUI[];
  charts: DashboardChartUI[];
}

export function useDashboard() {
  const { data: rawData, isLoading, isError, error } = useGetDashboardQuery();

  const data = useMemo((): DashboardUI | undefined => {
    if (!rawData) return undefined;

    const charts = rawData.charts;

    // Construire le chart global à partir des 3 premiers
    const globalChart: DashboardChartUI = {
      id: "global",
      datasets: [
        charts[0]?.datasets[0] ?? [],
        charts[1]?.datasets[0] ?? [],
        charts[2]?.datasets[0] ?? [],
      ],
      labels: charts[0]?.labels ?? [],
    };

    return {
      stats: rawData.stats.map((item) => {
        const config = STATS_CONFIG[item.id];
        return {
          id: item.id,
          title: config.title,
          iconName: config.iconName,
          variant: config.variant,
          value: item.value,
          growth: `${item.growth > 0 ? "+" : ""}${item.growth}%`,
          trend: item.growth > 0 ? "up" : "down",
        };
      }),
      charts: [...charts, globalChart],
    };
  }, [rawData]);

  return { data, loading: isLoading, error: isError ? error : null };
}