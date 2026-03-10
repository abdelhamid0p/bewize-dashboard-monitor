/**
 * Order table columns configuration
 */

import type { Column } from "@/shared/components/organisms/data-table";

export const ORDERS_COLUMNS: Column[] = [
  { key: "id", label: "Order ID" },
  { key: "student", label: "Étudiant" },
  { key: "plan", label: "Plan" },
  { key: "type", label: "Type" },
  { key: "paymentMethod", label: "Méthode de paiement" },
  { key: "status", label: "Statut" },
  { key: "date", label: "Date" },
];
