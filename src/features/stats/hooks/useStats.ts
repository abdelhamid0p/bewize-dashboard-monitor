import { fetchDashboard } from "../api/stats_api"
import { STATS_CONFIG } from "../config/stats_config"
import type { DashboardStatUI } from "../model/stats_types"
import type { DashboardChartUI } from "../model/stats_chart_type"
import { useFetchData } from "@/shared/hooks"

export interface DashboardUI {
  stats: DashboardStatUI[]
  charts: DashboardChartUI[]
}

export function useDashboard() {
  return useFetchData(
    fetchDashboard,
    (data): DashboardUI => {
      const charts = data.charts

      // ✅ Construire le chart global à partir des 3 premiers
      const globalChart: DashboardChartUI = {
        id: "global",
        datasets: [
          charts[0].datasets[0], // students
          charts[1].datasets[0], // orders
          charts[2].datasets[0], // subscriptions
        ],
        labels: charts[0].labels, // Les labels sont les mêmes
      }

      return {
        stats: data.stats.map((item) => {
          const config = STATS_CONFIG[item.id]

          return {
            id: item.id,
            title: config.title,
            iconName: config.iconName,
            variant: config.variant,
            value: item.value,
            growth: `${item.growth > 0 ? "+" : ""}${item.growth}%`,
            trend: item.growth > 0 ? "up" : "down",
          }
        }),

        charts: [...charts, globalChart],
      }
    }
  )
}