import type { Order, OrdersQueryParams } from "@/shared/types/orders.types";

export interface PromoCodesOrdersFilters {
  page?: number;
  size?: number;
  status?: string;
  code?: string;
  date?: string;
  percentage?: number;
}

export type PromoCodeStatus = "active" | "pending" | "expired";

export interface PromoCodeRow {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  percentage: string;
  status: PromoCodeStatus;
}

const mapStatus = (status: Order["status"]): PromoCodeStatus => {
  switch (status) {
    case "PAID":
      return "active";
    case "PENDING":
      return "pending";
    case "UNPAID":
    default:
      return "expired";
  }
};

export const mapOrderToPromoCodeRow = (
  order: Order,
): PromoCodeRow | null => {
  // Skip orders without subscription data
  if (!order.subscription) {
    return null;
  }

  return {
    id: order.id,
    code: order.code,
    startDate: new Date(order.subscription.startDate).toLocaleDateString(
      "fr-FR",
    ),
    endDate: new Date(order.subscription.endDate).toLocaleDateString("fr-FR"),
    percentage: order.discount ? `${order.discount.percentage}%` : "0%",
    status: mapStatus(order.status),
  };
};

export const mapOrdersToPromoCodesRows = (orders: Order[]): PromoCodeRow[] =>
  orders
    .map(mapOrderToPromoCodeRow)
    .filter((row): row is PromoCodeRow => row !== null);

export const buildPromoCodesOrdersQueryParams = (
  filters: PromoCodesOrdersFilters,
  searchTerm: string,
): OrdersQueryParams => ({
  page: filters.page,
  size: filters.size,
  search: searchTerm,
  status: filters.status,
  code: filters.code,
  date: filters.date,
  percentage: filters.percentage,
});
