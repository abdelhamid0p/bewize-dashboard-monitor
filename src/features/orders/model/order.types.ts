/**
 * Order Types
 */

// ============ BACKEND TYPES ============
export interface OrderBackend {
  id: string;
  code: string | null;
  type: "CARD" | "CASH_PLUS" | null;
  status: "PAID" | "UNPAID" | "FREE";
  planType: "FREEMIUM" | "PREMIUM";
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

// ============ UI TYPES ============
export interface OrderUI {
  id: string;
  student: string;
  plan: string;
  type: string;
  paymentMethod: string;
  status: "paid" | "unpaid" | "free";
  date: string;
}

// ============ FILTER TYPES ============
export interface OrdersFilters {
  page?: number;
  size?: number;
  status?: string;
  planType?: string;
  search?: string;
}
