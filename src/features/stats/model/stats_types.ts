import type { IconName } from "@/shared/components/atoms/icon"

export type StatsId = "students" | "orders" | "subscriptions"

export interface DashboardStatResponse {
  id: StatsId
  value: number
  growth: number
}

// Type final utilisé par la UI
export interface DashboardStatUI {
  id: StatsId
  title: string
  value: number
  growth: string
  trend: "up" | "down"
  iconName: IconName
  variant: "orange" | "blue" | "green"
}
