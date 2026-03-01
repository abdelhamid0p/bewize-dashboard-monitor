/**
 * Subscriptions columns configuration
 */

import type { Column } from "@/shared/components/organisms/data-table";

export const SUBSCRIPTIONS_COLUMNS: Column[] = [
  { key: "cne", label: "CNE" },
  { key: "startDate", label: "Date de début" },
  { key: "endDate", label: "Date de fin" },
  { key: "planType", label: "Type de plan" },
  { key: "subscriptionType", label: "Type d'abonnement" },
  { key: "status", label: "Statut" },
  { key: "actions", label: "Actions" },
];
