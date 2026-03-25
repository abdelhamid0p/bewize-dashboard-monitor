import { ICONS, type IconName } from "@/shared/components/atoms/icon"

export interface NavbarConfig {
  title: string
  showDatePicker?: boolean
  showExportButton?: boolean
  showSettingsButton?: boolean
}

export interface NavigationItem {
  id: string
  label: string
  icon: IconName
  path: string
  navbar: NavbarConfig
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: ICONS.layoutGrid,
    path: "/dashboard",
    navbar: {
      title: "Bon retour",
      showDatePicker: true,
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "students",
    label: "Étudiants",
    icon: ICONS.users,
    path: "/dashboard/students",
    navbar: {
      title: "Les étudiants",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "orders",
    label: "Commandes",
    icon: ICONS.shoppingCart,
    path: "/dashboard/orders",
    navbar: {
      title: "Les commandes",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "subscriptions",
    label: "Abonnements",
    icon: ICONS.fileText,
    path: "/dashboard/subscriptions",
    navbar: {
      title: "Les abonnements",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "reductions",
    label: "Réductions",
    icon: ICONS.tag,
    path: "/dashboard/reductions",
    navbar: {
      title: "Les codes promo",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "reclamations",
    label: "Réclamations",
    icon: ICONS.cloudLightning,
    path: "/dashboard/reclamations",
    navbar: {
      title: "Les réclamations",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
  {
    id: "schools",
    label: "Écoles",
    icon: ICONS.store,
    path: "/dashboard/schools",
    navbar: {
      title: "Les écoles",
      showExportButton: true,
      showSettingsButton: true,
    },
  },
]

/** Get navbar config for the current path */
export const getNavbarConfig = (pathname: string): NavbarConfig => {
  // Si on est sur la page de détail étudiant, masquer le titre
  if (/^\/dashboard\/students\/[\w-]+$/.test(pathname)) {
    return { title: "", showExportButton: false, showSettingsButton: false };
  }
  const item = NAVIGATION_ITEMS.find((item) => item.path === pathname)
  return item?.navbar ?? { title: "Dashboard", showExportButton: true, showSettingsButton: true }
}