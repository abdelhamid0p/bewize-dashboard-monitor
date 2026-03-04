import { baseApi } from '@/shared/services/baseApi';
import type { ChartApiResponse, ChartQueryParams } from '../model/chart.types';

/**
 * Subscriptions Chart API
 * GET /dashboard/subscriptions
 */
export const subscriptionsChartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionsChart: builder.query<ChartApiResponse, ChartQueryParams>({
      query: ({ year, month }) => {
        const params = new URLSearchParams();
        params.append('year', year.toString());
        if (month !== undefined) {
          params.append('month', month.toString().padStart(2, '0'));
        }
        return `/dashboard/subscriptions?${params.toString()}`;
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetSubscriptionsChartQuery } = subscriptionsChartApi;
