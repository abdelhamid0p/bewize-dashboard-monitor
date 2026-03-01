/**
 * Promo Codes columns configuration
 */

import type { Column } from "@/shared/components/organisms/data-table";

export const PROMO_CODES_COLUMNS: Column[] = [
  { key: "code", label: "Code" },
  { key: "startDate", label: "Date de début" },
  { key: "endDate", label: "Date de fin" },
  { key: "percentage", label: "Pourcentage" },
  { key: "status", label: "Statut" },
  { key: "actions", label: "Actions" },
];
