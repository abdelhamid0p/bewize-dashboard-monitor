import { fetchDashboardStats } from "../api/stats_api"
import { STATS_CONFIG } from "../config/stats_config"
import type { DashboardStatUI } from "../model/stats_types"
import { useFetchData } from "@/shared/hooks"

export function useStats() {
  return useFetchData(
    fetchDashboardStats,
    (data) =>
      data.map((item) => {
        const config = STATS_CONFIG[item.id]
        return {
          id: item.id,
          title: config.title,
          iconName: config.iconName,
          variant: config.variant,
          value: item.value,
          growth: `${item.growth > 0 ? "+" : ""}${item.growth}%`,
          trend: item.growth > 0 ? "up" : "down",
        } as DashboardStatUI
      })
  )
}
