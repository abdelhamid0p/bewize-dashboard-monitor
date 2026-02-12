import { ICONS, type IconName } from "@/shared/components/atoms/icon"

export const statsNumbers = [
  {
    id: "students" as const,
    title: "Total des étudiants",
    value: 10105, 
    growth: "+ 800 (1.4%)",
    trend: "up",
    iconName: ICONS.users
  },
  {
    id: "orders" as const,
    title: "Total des commandes",
    value: 1105,
    growth: "- 800 (1.1%)",
    trend: "down",
    iconName: ICONS.shoppingCart
  },
  {
    id: "subscriptions" as const,
    title: "Total des abonnements",
    value: 3105,
    growth: "+ 800 (1.5%)",
    trend: "up",
    iconName: ICONS.fileText
  },
] as const

type ChartData = {
  id: "students_stats" | "orders_stats" | "subscriptions_stats" | "global_overview"
  title: string
  data: number[][]
  labels: string[]
  iconName: IconName
  showLegend: boolean
  legendItems?: { label: string; color: string }[]
}

export const statsCharts: ChartData[] = [
  {
    id: "students_stats",
    title: "Statistiques des étudiants",
    data: [[15, 35, 45, 28]], // Single dataset for line chart
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    iconName: ICONS.users,
    showLegend: false,
  },
  {
    id: "orders_stats",
    title: "Statistiques des commandes",
    data: [[12, 42, 38, 48]], // Single dataset
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    iconName: ICONS.shoppingCart,
    showLegend: false,
  },
  {
    id: "subscriptions_stats",
    title: "Statistiques des abonnements",
    data: [[8, 18, 45, 42]], // Single dataset
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    iconName: ICONS.fileText,
    showLegend: false,
  },
  {
    id: "global_overview",
    title: "Aperçu Global",
    data: [
      [15, 42, 35, 25], // Students data (orange)
      [22, 18, 38, 45], // Orders data (blue)
      [8, 25, 48, 42],  // Subscriptions data (green)
    ],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    iconName: ICONS.focus, // or any appropriate icon
    showLegend: true,
    legendItems: [
      { label: "Étudiants totales", color: "#F59E0B" },
      { label: "Sales Totales", color: "#3B82F6" },
      { label: "Subscriptions Totales", color: "#10B981" },
    ],
  },
]

// Type for the charts
export type StatsChart = ChartData