import type { Order } from "../entities/order";

export interface PaginationMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface OrdersQueryParams {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  type?: string;
  planType?: string;
  status?: string;
  code?: string;
  date?: string;
  gender?: string;
  deviceType?: string;
  level?: string;
  percentage?: number | string;
}

export interface OrdersRepository {
  getOrders(params: OrdersQueryParams): Promise<Paginated<Order>>;
}
