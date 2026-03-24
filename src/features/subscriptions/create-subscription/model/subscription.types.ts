export type PlanDurationType =
  | "FREEMIUM"
  | "PREMIUM"
  | "YEAR"
  | "SEMESTER"
  | "TRIMESTER"
  | "MONTH"
  | "SCHOOL";

export interface CreateManualSubscriptionRequest {
  studentId: string;
  planType: PlanDurationType;
  startDate: string;
}

export interface ManualSubscriptionResponse {
  id: string;
  startDate: string;
  endDate: string;
  orderId: string;
}

export const PLAN_DURATION_OPTIONS: Array<{ label: string; value: PlanDurationType }> = [
  { label: "Annuel", value: "YEAR" },
  { label: "Semestriel", value: "SEMESTER" },
  { label: "Trimestriel", value: "TRIMESTER" },
  { label: "Mensuel", value: "MONTH" },
];
