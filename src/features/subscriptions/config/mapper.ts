/**
 * Subscriptions mapper
 */

import type { SubscriptionBackend, SubscriptionUI } from "../model/subscription.types";

const getStatus = (endDate: string): "active" | "inactive" => {
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return end >= today ? "active" : "inactive";
};

export const mapSubscriptionToUI = (backend: SubscriptionBackend): SubscriptionUI => ({
  id: backend.id,
  cne: backend.cne || "—",
  startDate: new Date(backend.startDate).toLocaleDateString("fr-FR"),
  endDate: new Date(backend.endDate).toLocaleDateString("fr-FR"),
  planType: (backend as unknown as { planType?: string }).planType || "N/A",
  subscriptionType:
    (backend as unknown as { subscriptionType?: string }).subscriptionType || "N/A",
  status: (backend as unknown as { status?: "active" | "inactive" }).status ?? getStatus(backend.endDate),
});
