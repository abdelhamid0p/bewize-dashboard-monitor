import type { OrderBackend, SubscriptionUI } from "../model";

/**
 * Maps Order backend data to Subscription UI format
 * Handles:
 * - Date formatting to fr-FR locale
 * - Status computation (ACTIVE if subscription.endDate >= today, else INACTIVE)
 * - Extracting subscription data from order
 * - Field transformation
 */
export const mapSubscriptionToUI = (
  order: OrderBackend,
): SubscriptionUI => {
  const subscription = order.subscription;

  // Compute subscription status: ACTIVE if endDate >= today, else INACTIVE
  const endDate = new Date(subscription.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const status = endDate >= today ? "active" : "inactive";

  return {
    id: subscription.id,
    cne: order.student.cne,
    startDate: new Date(subscription.startDate).toLocaleDateString("fr-FR"),
    endDate: new Date(subscription.endDate).toLocaleDateString("fr-FR"),
    planType: order.planType,
    subscriptionType: order.type,
    status,
    paymentStatus: order.status,
  };
};
