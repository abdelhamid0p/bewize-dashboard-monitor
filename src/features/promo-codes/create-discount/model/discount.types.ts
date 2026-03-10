export interface CreateDiscountRequest {
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

export interface DiscountResponse {
  id: string;
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
}
