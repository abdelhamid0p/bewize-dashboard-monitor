import { baseApi } from '@/shared/services/baseApi';
import type { StudentDetails } from '../model/student-details.types';

export const studentDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentDetails: builder.query<StudentDetails, string>({
      query: (studentId) => `/students/${studentId}`,
    }),
  }),
});

export const { useGetStudentDetailsQuery } = studentDetailsApi;