import { baseApi } from '../baseApi';
import type { OrdersResponse, OrdersQueryParams } from '@/shared/types/orders.types';

/**
 * Orders API - handles all orders endpoints
 * Manages filtering, pagination, and sorting
 */
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, OrdersQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.size !== undefined) queryParams.append('size', params.size.toString());
        if (params.sort) {
          params.sort.forEach((s) => queryParams.append('sort', s));
        }
        if (params.status) queryParams.append('status', params.status);
        if (params.planType) queryParams.append('planType', params.planType);
        if (params.studentId) queryParams.append('studentId', params.studentId);
        if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
        if (params.dateTo) queryParams.append('dateTo', params.dateTo);

        return `/orders?${queryParams.toString()}`;
      },
      providesTags: ['Order'],
    }),

    getOrderById: builder.query({
      query: (id: string) => `/orders/${id}`,
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
