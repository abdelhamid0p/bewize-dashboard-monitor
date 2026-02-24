// ===== Subscription DTO =====
export interface SubscriptionDto {
  id: string;
  startDate: string;
  endDate: string;
}

// ===== Student DTO =====
export interface StudentDto {
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
}

// ===== Discount DTO =====
export interface DiscountDto {
  id: string;
  percentage: number;
}

// ===== Order DTO (Backend) =====
export interface OrderBackend {
  id: string;
  code: string;
  type: string;
  status: "PAID" | "PENDING" | "UNPAID";
  planType: string;
  date: string;
  amount: number;
  subscription: SubscriptionDto;
  student: StudentDto;
  discount?: DiscountDto;
}
