export interface StudentBackend {
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "FEMALE" | "MALE";
  singupDate: string;
  level: {
    levelName: string;
    cycle: "ELEMENTARY_SCHOOL" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
  };
}
