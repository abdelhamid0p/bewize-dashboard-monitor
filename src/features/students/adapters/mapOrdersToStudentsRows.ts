import type { Order } from "@/features/orders/domain/entities/order";
import type { OrdersQueryParams } from "@/features/orders/domain/repositories/orders_repository";

export interface StudentsOrdersFilters {
  page?: number;
  size?: number;
  type?: string;
  planType?: string;
  deviceType?: string;
  gender?: string;
  level?: string;
}

export interface StudentRow {
  id: string;
  name: string;
  phone: string;
  subscriptionType: string;
  planType: string;
  deviceSystem: string;
  gender: string;
  signupDate: string;
  level: string;
}

export const mapOrderToStudentRow = (order: Order): StudentRow | null => {
  const signupDate = order.date
    ? new Date(order.date).toLocaleDateString("fr-FR")
    : "N/A";

  return {
    id: order.id,
    name: `${order.student.firstName} ${order.student.lastName}`,
    phone: order.student.phone || "N/A",
    subscriptionType: order.type || "N/A",
    planType: order.planType || "N/A",
    deviceSystem: order.student.deviceType || "N/A",
    gender: order.student.gender || "N/A",
    signupDate,
    level: order.student.level || "N/A",
  };
};

export const mapOrdersToStudentsRows = (orders: Order[]): StudentRow[] =>
  orders
    .map(mapOrderToStudentRow)
    .filter((row): row is StudentRow => row !== null);

export const buildStudentsOrdersQueryParams = (
  filters: StudentsOrdersFilters,
  searchTerm: string,
): OrdersQueryParams => ({
  page: filters.page,
  size: filters.size,
  search: searchTerm,
  type: filters.type,
  planType: filters.planType,
  gender: filters.gender,
  deviceType: filters.deviceType,
  level: filters.level,
});
