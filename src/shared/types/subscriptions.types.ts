import { PaginatedResponse, PaginationParams } from './api.types';

/**
 * Subscription domain model
 */
export interface Subscription {
  id: string;
  startDate: string;
  endDate: string;
  orderId: string;
}

export type SubscriptionsResponse = PaginatedResponse<Subscription>;

/**
 * Query parameters for subscriptions endpoint
 */
export interface SubscriptionsQueryParams extends PaginationParams {
  orderId?: string;
  active?: boolean;
}
