/**
 * Student Types - Single source of truth for student types
 */

// ============ BACKEND TYPES ============
/**
 * Raw student data from API
 * Matches shared/types/students.types.ts Student type
 */
export interface StudentBackend {
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  singupDate: string;
  level: {
    levelName: string;
    cycle: "ELEMENTARY_SCHOOL" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL" | "UNIVERSITY" | "OTHER";
  };
}

// ============ UI TYPES ============
/**
 * Student data formatted for table display
 * Matches STUDENTS_COLUMNS keys exactly
 */
export interface StudentUI {
  id: string;
  name: string;
  phone: string;
  subscriptionType?: string;
  planType?: string;
  deviceSystem?: string;
  gender: string;
  signupDate: string;
  level: string;
}

// ============ FILTER TYPES ============
/**
 * Available filters for students table
 */
export interface StudentsFilters {
  page?: number;
  size?: number;
  search?: string;
  gender?: string;
  cycle?: string;
}
