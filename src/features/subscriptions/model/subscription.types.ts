/**
 * Subscription Types
 */

// ============ BACKEND TYPES ============
export interface SubscriptionBackend {
  id: string;
  startDate: string;
  endDate: string;
  orderId: string;
  cne?: string;
}

// ============ UI TYPES ============
export interface SubscriptionUI {
  id: string;
  cne: string;
  startDate: string;
  endDate: string;
  planType: string;
  subscriptionType: string;
  status: "active" | "inactive";
}

// ============ FILTER TYPES ============
export interface SubscriptionsFilters {
  page?: number;
  size?: number;
  orderId?: string;
  active?: boolean;
  status?: string;
  type?: string;
  planType?: string;
}
