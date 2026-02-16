import type { DashboardResponse } from "../model/dashboard_types"

export async function fetchDashboard(): Promise<DashboardResponse> {
  return Promise.resolve({
    stats: [
      { id: "students", value: 12000, growth: 1.4 },
      { id: "orders", value: 820, growth: -0.8 },
      { id: "subscriptions", value: 3200, growth: 2.1 },
    ],
    charts: [
      {
        id: "students",
        datasets: [[120, 180, 150, 110]],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      {
        id: "orders",
        datasets: [[80, 140, 175, 60]],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      {
        id: "subscriptions",
        datasets: [[40, 90, 175, 90]],
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
    ],
  })
}