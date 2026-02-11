import { ICONS, type IconName } from "@/shared/components/atoms/icon"

export interface NavigationItem {
  id: string
  label: string
  icon: IconName
  path: string
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: ICONS.layoutGrid,
    path: "/dashboard",
  },
  {
    id: "students",
    label: "Étudiants",
    icon: ICONS.users,
    path: "/dashboard/students",
  },
  {
    id: "orders",
    label: "Commandes",
    icon: ICONS.shoppingCart,
    path: "/dashboard/orders",
  },
  {
    id: "subscriptions",
    label: "Abonnements",
    icon: ICONS.fileText,
    path: "/dashboard/subscriptions",
  },
  {
    id: "reductions",
    label: "Réductions",
    icon: ICONS.tag,
    path: "/dashboard/reductions",
  },
  {
    id: "reclamations",
    label: "Réclamations",
    icon: ICONS.cloudLightning,
    path: "/dashboard/reclamations",
  },
  {
    id: "schools",
    label: "Écoles",
    icon: ICONS.store,
    path: "/dashboard/schools",
  },
]