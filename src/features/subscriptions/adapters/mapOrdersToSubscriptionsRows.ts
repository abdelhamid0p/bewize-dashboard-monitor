import type { Order } from "@/features/orders/domain/entities/order";
import type { OrdersQueryParams } from "@/features/orders/domain/repositories/orders_repository";

export interface SubscriptionsOrdersFilters {
  page?: number;
  size?: number;
  type?: string;
  planType?: string;
  status?: string;
  date?: string;
}

export type SubscriptionStatus = "active" | "inactive";

export interface SubscriptionRow {
  id: string;
  cne: string;
  startDate: string;
  endDate: string;
  planType: string;
  subscriptionType: string;
  status: SubscriptionStatus;
}

const computeStatus = (endDate: string): SubscriptionStatus => {
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return end >= today ? "active" : "inactive";
};

export const mapOrderToSubscriptionRow = (
  order: Order,
): SubscriptionRow | null => {
  // Skip orders without subscription data
  if (!order.subscription) {
    return null;
  }

  return {
    id: order.subscription.id,
    cne: order.student.cne,
    startDate: new Date(order.subscription.startDate).toLocaleDateString(
      "fr-FR",
    ),
    endDate: new Date(order.subscription.endDate).toLocaleDateString("fr-FR"),
    planType: order.planType,
    subscriptionType: order.type,
    status: computeStatus(order.subscription.endDate),
  };
};

export const mapOrdersToSubscriptionsRows = (
  orders: Order[],
): SubscriptionRow[] =>
  orders
    .map(mapOrderToSubscriptionRow)
    .filter((row): row is SubscriptionRow => row !== null);

export const buildSubscriptionsOrdersQueryParams = (
  filters: SubscriptionsOrdersFilters,
  searchTerm: string,
): OrdersQueryParams => ({
  page: filters.page,
  size: filters.size,
  search: searchTerm,
  type: filters.type,
  planType: filters.planType,
  status: filters.status,
  date: filters.date,
});
