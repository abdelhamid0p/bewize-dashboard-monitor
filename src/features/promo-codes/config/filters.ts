/**
 * Promo Codes filters configuration
 */

import type { FilterConfig } from "@/shared/components/organisms/data-table";

export const PROMO_CODES_FILTERS: FilterConfig[] = [
  
    {
    key: "active",
    label: "Statut",
    options: [
      { label: "Actif", value: "true" },
      { label: "Expiré", value: "false" },
    ],
  },
   {
    key: "code",
    label: "Code",
    options: [
    { label: "0000", value: "1" },

    ],
  },
    {
    key: "percentage",
    label: "Pourcentage",
    options: [
      { label: "10%", value: "10" },
      { label: "20%", value: "20" },
      { label: "30%", value: "30" },
      { label: "40%", value: "40" },
      { label: "50%", value: "50" },
    ],
  }

];
