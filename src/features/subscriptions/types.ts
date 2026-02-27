import type { Subscription } from '@/shared/types/subscriptions.types';

/**
 * Subscription Row type for table display
 * Extends Subscription with table-specific properties
 */
export interface SubscriptionRow extends Subscription {
  status?: 'active' | 'inactive';
}

/**
 * Filters for subscriptions table
 */
export interface SubscriptionsTableFilters {
  page?: number;
  size?: number;
  orderId?: string;
  active?: boolean;
  sort?: string[];
}
