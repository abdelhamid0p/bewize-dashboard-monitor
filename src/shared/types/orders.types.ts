import type { PaginatedResponse, PaginationParams } from './api.types';

/**
 * Order domain model — matches GET /orders response
 */
export interface Order {
  id: string;
  code: string | null;
  type: 'CARD' | 'CASH_PLUS' | null;
  status: 'PAID' | 'UNPAID' | 'FREE';
  planType: 'FREEMIUM' | 'PREMIUM';
  date: string;
  amount: number;
  subscription: {
    id: string;
    startDate: string;
    endDate: string;
  } | null;
  student: {
    id: string;
    cne: string | null;
    firstName: string;
    lastName: string | null;
    email: string;
  };
  discount: {
    id: string;
    percentage: number;
  } | null;
}

export type OrdersResponse = PaginatedResponse<Order>;

/**
 * Query parameters for orders endpoint
 */
export interface OrdersQueryParams extends PaginationParams {
  status?: string;
  planType?: string;
  search?: string;
}
