// ===== Types pour les filtres =====
export interface StudentsFilters {
  page?: number;
  size?: number;
  search?: string;
  gender?: "FEMALE" | "MALE";
  cycle?: "ELEMENTARY_SCHOOL" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
}
