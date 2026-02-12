import type { IconName } from "@/shared/components/atoms/icon"

// Ce que renvoie le backend
export interface DashboardStatResponse {
  id: "students" | "orders" | "subscriptions"
  value: number
  growth: number // exemple : 1.4 ou -0.8
}

// Type final utilisé par la UI
export interface DashboardStatUI {
  id: "students" | "orders" | "subscriptions"
  title: string
  value: number
  growth: string
  trend: "up" | "down"
  iconName: IconName
  variant: "orange" | "blue" | "green"
}
