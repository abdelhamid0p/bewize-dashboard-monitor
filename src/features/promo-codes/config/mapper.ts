/**
 * Promo Codes mapper
 */

import type { PromoCodeBackend, PromoCodeUI } from "../model/promo-code.types";

const getStatus = (endDate: string): "active" | "expired" => {
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return end >= today ? "active" : "expired";
};

export const mapPromoCodeToUI = (backend: PromoCodeBackend): PromoCodeUI => ({
  id: backend.id,
  code: backend.code,
  startDate: new Date(backend.startDate).toLocaleDateString("fr-FR"),
  endDate: new Date(backend.endDate).toLocaleDateString("fr-FR"),
  percentage: backend.percentage,
  status: getStatus(backend.endDate),
});
