/**
 * Promo Code Types
 */

// ============ BACKEND TYPES ============
export interface PromoCodeBackend {
  id: string;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

// ============ UI TYPES ============
export interface PromoCodeUI {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  percentage: number;
  status: "active" | "expired";
}

// ============ FILTER TYPES ============
export interface PromoCodesFilters {
  page?: number;
  size?: number;
  code?: string;
  active?: boolean;
}
