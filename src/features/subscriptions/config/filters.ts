/**
 * Subscriptions filters configuration
 */

import type { FilterConfig } from "@/shared/components/organisms/data-table";

export const SUBSCRIPTIONS_FILTERS: FilterConfig[] = [
  {
    key: "date",
    label: "Date",
    options: [],
  },
  {
    key: "status",
    label: "Statut",
    options: [
      { label: "Actif", value: "ACTIVE" },
      { label: "Inactif", value: "INACTIVE" },
    ],
  },
  {
    key: "type",
    label: "Type d'abonnement",
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
    options: [
      { label: "Annuel", value: "ANNUAL" },
      { label: "Mensuel", value: "MONTHLY" },
      { label: "Trimestriel", value: "QUARTERLY" },
      { label: "Semestriel", value: "SEMESTER" },
    ],
  },
];
