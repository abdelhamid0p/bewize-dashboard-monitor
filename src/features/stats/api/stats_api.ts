import type { DashboardStatResponse } from "../model/stats_types"

export async function fetchDashboardStats(): Promise<DashboardStatResponse[]> {
  // Simulation API
  return Promise.resolve([
    { id: "students", value: 12000, growth: 1.4 ,  },
    { id: "orders", value: 850, growth: -0.8 },
    { id: "subscriptions", value: 3200, growth: 2.1 },
  ])
}
