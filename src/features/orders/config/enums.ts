/**
 * Order enums - display labels for backend values
 */

export const STATUS_LABELS: Record<string, string> = {
  PAID: "Payé",
  UNPAID: "Non payé",
  FREE: "Gratuit",
};

export const STATUS_COLORS: Record<string, "green" | "red" | "blue"> = {
  PAID: "green",
  UNPAID: "red",
  FREE: "blue",
};

export const PLAN_LABELS: Record<string, string> = {
  FREEMIUM: "Freemium",
  PREMIUM: "Premium",
};

export const TYPE_LABELS: Record<string, string> = {
  CARD: "Carte",
  CASH_PLUS: "Cash Plus",
};
