import type { PaginatedResponse, PaginationParams } from './api.types';

/**
 * Order domain model
 */
export interface Order {
  id: string;
  code: string;
  type: 'CARD' | 'BANK_TRANSFER' | 'WALLET' | 'OTHER';
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  planType: 'FREEMIUM' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  date: string;
  amount: number;
  subscription: {
    id: string;
    startDate: string;
    endDate: string;
  };
  student: {
    id: string;
    cne: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  discount?: {
    id: string;
    percentage: number;
  };
}

export type OrdersResponse = PaginatedResponse<Order>;

/**
 * Query parameters for orders endpoint
 */
export interface OrdersQueryParams extends PaginationParams {
  status?: string;
  planType?: string;
  studentId?: string;
  dateFrom?: string;
  dateTo?: string;
}
