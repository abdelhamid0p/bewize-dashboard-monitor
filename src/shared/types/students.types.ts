import { PaginatedResponse, PaginationParams } from './api.types';

/**
 * Student domain model
 */
export interface Student {
  id: string;
  cne: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  singupDate: string;
  level: {
    levelName: string;
    cycle: 'ELEMENTARY_SCHOOL' | 'MIDDLE_SCHOOL' | 'HIGH_SCHOOL' | 'UNIVERSITY' | 'OTHER';
  };
}

export type StudentsResponse = PaginatedResponse<Student>;

/**
 * Query parameters for students endpoint
 */
export interface StudentsQueryParams extends PaginationParams {
  search?: string;
  gender?: string;
  cycle?: string;
}
