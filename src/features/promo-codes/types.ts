import type { Discount } from '@/shared/types/discounts.types';

/**
 * Promo Code Row type for table display
 * Extends Discount with table-specific properties
 */
export interface PromoCodeRow extends Discount {
  status?: 'active' | 'pending' | 'expired';
}

/**
 * Filters for promo codes table
 */
export interface PromoCodesTableFilters {
  page?: number;
  size?: number;
  status?: string;
  code?: string;
  sort?: string[];
}
