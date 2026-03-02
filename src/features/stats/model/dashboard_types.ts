import type { DashboardChartResponse } from "./stats_chart_type"
import type { DashboardStatResponse } from "./stats_types"

export interface DashboardResponse {
  stats: DashboardStatResponse[]
  charts: DashboardChartResponse[]
}
