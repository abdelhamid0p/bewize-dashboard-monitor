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
  planType: "Annuel", // Default - would come from backend
  subscriptionType: "Premium", // Default - would come from backend
  status: getStatus(backend.endDate),
});
