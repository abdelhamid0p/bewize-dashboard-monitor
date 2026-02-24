import type { FilterConfig } from "@/features/tables/types";

export const PROMO_CODES_TABLE_FILTERS: FilterConfig[] = [
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
      { label: "Expire", value: "EXPIRED" },
      { label: "En attente", value: "PENDING" },
    ],
  },
  {
    key: "code",
    label: "Code",
    type: "select",
  },
  {
    key: "percentage",
    label: "Pourcentage",
    type: "select",
    options: [
      { label: "10%", value: "10" },
      { label: "20%", value: "20" },
      { label: "30%", value: "30" },
      { label: "40%", value: "40" },
      { label: "50%", value: "50" },
    ],
  },
];
