/**
 * Order filters configuration
 */

import type { FilterConfig } from "@/shared/components/organisms/data-table";

export const ORDERS_FILTERS: FilterConfig[] = [
  {
    key: "status",
    label: "Statut",
    options: [
      { label: "Payé", value: "PAID" },
      { label: "Non payé", value: "UNPAID" },
      { label: "Gratuit", value: "FREE" },
    ],
  },
  {
    key: "planType",
    label: "Plan",
    options: [
      { label: "Freemium", value: "FREEMIUM" },
      { label: "Premium", value: "PREMIUM" },
    ],
  },
];
