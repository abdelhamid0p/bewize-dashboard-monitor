import type { StudentOrder } from "./student-details.types";

export interface SubscriptionRow {
  id: string;
  startDate: string;
  endDate: string;
  orderId: string;
  planType: string;
}

/**
 * Extracts subscription data from student orders.
 * Filters orders that have a subscription and maps to a flat row structure.
 */
export const mapOrdersToSubscriptions = (
  orders: StudentOrder[],
): SubscriptionRow[] =>
  orders
    .filter((order) => order.subscription != null)
    .map((order) => ({
      id: order.subscription!.id,
      startDate: order.subscription!.startDate,
      endDate: order.subscription!.endDate,
      orderId: order.id,
      planType: order.planType,
    }));
