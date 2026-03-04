import { baseApi } from '@/shared/services/baseApi';
import type { MetricsApiResponse } from '../model/metrics.types';

/**
 * Dashboard Metrics API - handles dashboard number card metrics
 * GET /dashboard/metrics
 */
export const metricsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<MetricsApiResponse, void>({
      query: () => '/dashboard/metrics',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
