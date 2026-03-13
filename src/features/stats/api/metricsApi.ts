import { baseApi } from '@/shared/services/baseApi';
import type { MetricsApiResponse } from '../model/metrics.types';
import type { DashboardResponse } from '../model/dashboard_types';

/**
 * Dashboard Metrics API - handles dashboard endpoints
 * - GET /dashboard/metrics (number cards)
 * - GET /dashboard (full dashboard with charts)
 */
export const metricsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<MetricsApiResponse, void>({
      query: () => '/dashboard/metrics',
      providesTags: ['Dashboard'],
    }),
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetMetricsQuery, useGetDashboardQuery } = metricsApi;
