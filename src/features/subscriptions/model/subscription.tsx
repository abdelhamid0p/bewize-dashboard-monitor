// ===== UI Model (Row) =====
export interface SubscriptionUI {
  id: string;
  cne: string;
  startDate: string;
  endDate: string;
  planType: string;
  subscriptionType: string;
  status: "active" | "inactive";
  paymentStatus: string;
}
