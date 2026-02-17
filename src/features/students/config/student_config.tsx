export const SUBSCRIPTION_TYPE_CONFIG = {
  freemium: { label: "Freemium", color: "green" as const },
  premium: { label: "Premium", color: "yellow" as const },
  pro: { label: "Pro", color: "blue" as const },
  "essai-gratuit": { label: "Essai gratuit", color: "yellow" as const },
}

export const PLAN_TYPE_CONFIG = {
  annual: { label: "Annuel" },
  monthly: { label: "Mensuel" },
  trimestriel: { label: "Trimestriel" },
}

export const TABLE_COLUMNS = [
  { key: "name", label: "Nom" },
  { key: "phone", label: "Téléphone" },
  { key: "subscriptionType", label: "Type d'abonnement" },
  { key: "planType", label: "Type de plan" },
  { key: "device", label: "Appareil / Système" },
  { key: "gender", label: "Genre" },
  { key: "registrationDate", label: "Date d'inscription" },
  { key: "level", label: "Niveau" },
  { key: "actions", label: "Actions" },
]