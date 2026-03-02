import type { StatsId } from "../config/stats_config"

export interface DashboardChartResponse {
  id: StatsId | "global"
  datasets: number[][]
  labels: string[]
}

export interface DashboardChartUI {
  id: StatsId | "global"
  datasets: number[][]
  labels: string[]
  showLegend?: boolean
  legendItems?: { label: string; color: string }[]
}
