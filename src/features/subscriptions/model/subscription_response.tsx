import type { OrderBackend } from "./subscription_dto";

// ===== API Response Type =====
export interface SubscriptionBackendResponse {
  data: OrderBackend[];
  meta: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
