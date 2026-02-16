import { ICONS, type IconName } from "@/shared/components/atoms/icon"

/**
 * Variants avec couleurs hex pour les graphiques
 */
export const VARIANT_STYLES = {
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-card",
    hex: "#FDB022", // ✅ Ajouté
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-card",
    hex: "#53B1FD", // ✅ Ajouté
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-card",
    hex: "#32D583", // ✅ Ajouté
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