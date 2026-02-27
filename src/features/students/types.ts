import type { Student } from '@/shared/types/students.types';

/**
 * Student Row type for table display
 * Extends Student with any table-specific computed properties
 */
export type StudentRow = Student;

/**
 * Filters for students table
 */
export interface StudentsTableFilters {
  page?: number;
  size?: number;
  gender?: string;
  cycle?: string;
  sort?: string[];
}
