import { ICONS, type IconName } from "@/shared/components/atoms/icon"

/**
 * Variants avec couleurs hex pour les graphiques
 */
export const VARIANT_STYLES = {
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-card",
    hex: "#FDB022",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-card",
    hex: "#53B1FD",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-card",
    hex: "#32D583",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-primary-500",
    hex: "#7C3AED",
  },
} as const

export type Variant = keyof typeof VARIANT_STYLES

/**
 * Configuration des cartes stats
 */
export const STATS_CONFIG = {
  students: {
    title: "Total des étudiants",
    iconName: ICONS.users as IconName,
    variant: "orange" as Variant,
  },
  orders: {
    title: "Total des commandes",
    iconName: ICONS.shoppingCart as IconName,
    variant: "blue" as Variant,
  },
  subscriptions: {
    title: "Total des abonnements",
    iconName: ICONS.fileText as IconName,
    variant: "green" as Variant,
  },
} as const

export type StatsId = keyof typeof STATS_CONFIG

/**
 * Configuration du graphique global
 */
export const GLOBAL_CHART_CONFIG = {
  title: "Vue globale",
  iconName: ICONS.focus as IconName,
  variant: "purple" as Variant,
  legendItems: [
    { label: "Étudiants", color: VARIANT_STYLES.orange.hex },
    { label: "Commandes", color: VARIANT_STYLES.blue.hex },
    { label: "Abonnements", color: VARIANT_STYLES.green.hex },
  ],
  colors: [
    VARIANT_STYLES.orange.hex,
    VARIANT_STYLES.blue.hex,
    VARIANT_STYLES.green.hex,
  ],
} as const