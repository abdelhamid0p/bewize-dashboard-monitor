export interface Subscription {
  id: string;
  startDate: string;
  endDate: string;
}

export interface Student {
  phone: string;
  deviceType: string;
  gender: string;
  level: string;
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Discount {
  id: string;
  percentage: number;
}

export interface Order {
  id: string;
  code: string;
  type: string;
  status: "PAID" | "PENDING" | "UNPAID";
  planType: string;
  date: string;
  amount: number;
  subscription: Subscription;
  student: Student;
  discount?: Discount;
}
