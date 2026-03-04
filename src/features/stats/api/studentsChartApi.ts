import { baseApi } from '@/shared/services/baseApi';
import type { ChartApiResponse, ChartQueryParams } from '../model/chart.types';

/**
 * Students Chart API
 * GET /dashboard/students
 */
export const studentsChartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsChart: builder.query<ChartApiResponse, ChartQueryParams>({
      query: ({ year, month }) => {
        const params = new URLSearchParams();
        params.append('year', year.toString());
        if (month !== undefined) {
          params.append('month', month.toString().padStart(2, '0'));
        }
        return `/dashboard/students?${params.toString()}`;
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetStudentsChartQuery } = studentsChartApi;
