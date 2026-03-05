export interface StudentOrder {
  id: string;
  code: string;
  type: string;
  status: string;
  planType: string;
  date: string;
  amount: number;
  subscription?: {
    id: string;
    startDate: string;
    endDate: string;
  };
}

export interface StudentLevel {
  levelName: string;
  cycle: string;
}

export interface StudentDetails {
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  lastLogin: string;
  level: StudentLevel;
  active: boolean;
  deleted: boolean;
  finishedCoursesCount: number;
  locationCountry: string;
  locationCity: string;
  lastVisit: string;
  singupDate: string;
  orders: StudentOrder[];
}
