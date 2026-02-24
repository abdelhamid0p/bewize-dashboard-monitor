import type { FilterConfig } from "@/features/tables/types";

export const SUBSCRIPTIONS_TABLE_FILTERS: FilterConfig[] = [
  {
    key: "date",
    label: "Date",
    type: "date",
  },
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { label: "Actif", value: "ACTIVE" },
      { label: "Inactif", value: "INACTIVE" },
    ],
  },
  {
    key: "type",
    label: "Type d'abonnement",
    type: "select",
    options: [
      { label: "Freemium", value: "FREEMIUM" },
      { label: "Premium", value: "PREMIUM" },
      { label: "Essai gratuit", value: "TRIAL" },
      { label: "Pro", value: "PRO" },
    ],
  },
  {
    key: "planType",
    label: "Type de plan",
    type: "select",
    options: [
      { label: "Annuel", value: "ANNUAL" },
      { label: "Mensuel", value: "MONTHLY" },
      { label: "Trimestriel", value: "QUARTERLY" },
      { label: "Semestriel", value: "SEMESTER" },
    ],
  },
];
