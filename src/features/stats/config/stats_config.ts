import { ICONS, type IconName } from "@/shared/components/atoms/icon"

/**
 * On déclare les variants possibles UNE SEULE FOIS
 */
export const VARIANT_STYLES = {
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-card",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-card",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-card",
  },
} as const

/**
 * Variant est automatiquement dérivé des clés de VARIANT_STYLES
 */
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

/**
 * Type des IDs
 */
export type StatsId = keyof typeof STATS_CONFIG
