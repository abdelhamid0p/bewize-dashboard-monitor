import { baseApi } from '@/shared/services/baseApi';
import type { ChartApiResponse, ChartQueryParams } from '../model/chart.types';

/**
 * Orders Chart API
 * GET /dashboard/orders
 */
export const ordersChartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersChart: builder.query<ChartApiResponse, ChartQueryParams>({
      query: ({ year, month }) => {
        const params = new URLSearchParams();
        params.append('year', year.toString());
        if (month !== undefined) {
          params.append('month', month.toString().padStart(2, '0'));
        }
        return `/dashboard/orders?${params.toString()}`;
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetOrdersChartQuery } = ordersChartApi;
