import type { StudentBackend } from "./student_dto";

// ===== Types Backend =====
export interface StudentBackendResponse {
  data: StudentBackend[];
  meta: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
