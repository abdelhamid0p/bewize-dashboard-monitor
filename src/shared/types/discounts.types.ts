import type { PaginatedResponse, PaginationParams } from './api.types';

/**
 * Discount/Promo Code domain model
 */
export interface Discount {
  id: string;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

export type DiscountsResponse = PaginatedResponse<Discount>;

/**
 * Query parameters for discounts endpoint
 */
export interface DiscountsQueryParams extends PaginationParams {
  active?: boolean;
  code?: string;
}
