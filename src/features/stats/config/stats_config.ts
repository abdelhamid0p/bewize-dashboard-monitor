import { ICONS } from "@/shared/components/atoms/icon"

export const STATS_CONFIG = {
  students: {
    title: "Total des étudiants",
    iconName: ICONS.users,
    variant: "orange",
  },
  orders: {
    title: "Total des commandes",
    iconName: ICONS.shoppingCart,
    variant: "blue",
  },
  subscriptions: {
    title: "Total des abonnements",
    iconName: ICONS.fileText,
    variant: "green",
  },
} as const
