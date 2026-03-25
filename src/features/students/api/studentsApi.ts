import { baseApi } from '@/shared/services/baseApi';
import type { StudentsResponse, StudentsQueryParams } from '@/shared/types/students.types';
import { STUDENTS_COLUMNS } from '../config';

const STUDENT_FIELDS = STUDENTS_COLUMNS.map((column) => column.key).filter((key) => key !== 'actions');
const STUDENT_REQUIRED_FIELDS = ['id'];

type FilterOptionsResponse = Record<string, Array<{ label: string; value: string }>>;

/**
 * Students API - handles all students-related endpoints
 * Manages filtering, pagination, and sorting
 */
export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<StudentsResponse, StudentsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.size !== undefined) queryParams.append('size', params.size.toString());
        if (params.sort) {
          params.sort.forEach((s) => queryParams.append('sort', s));
        }
        if (params.search) queryParams.append('search', params.search);
        if (params.gender) queryParams.append('gender', params.gender);
        if (params.cycle) queryParams.append('cycle', params.cycle);
        if (params.deviceType) queryParams.append('deviceType', params.deviceType);
        if (params.level) queryParams.append('level', params.level);
        if (params.type) queryParams.append('type', params.type);
        if (params.planType) queryParams.append('planType', params.planType);
        const requestedFields = Array.from(
          new Set([...(params.fields?.length ? params.fields : STUDENT_FIELDS), ...STUDENT_REQUIRED_FIELDS])
        );
        requestedFields.forEach((field) => queryParams.append('fields', field));

        return `/datatable/students?${queryParams.toString()}`;
      },
      providesTags: ['Student'],
    }),

    getStudentFilterOptions: builder.query<FilterOptionsResponse, void>({
      query: () => '/datatable/students/filters',
      providesTags: ['Student'],
    }),

    getStudentById: builder.query({
      query: (id: string) => `/students/${id}`,
      providesTags: ['Student'],
    }),
  }),
});

export const { useGetStudentsQuery, useGetStudentFilterOptionsQuery, useGetStudentByIdQuery } = studentsApi;
