import { baseApi } from '@/shared/services/baseApi';
import type { SubscriptionsResponse, SubscriptionsQueryParams } from '@/shared/types/subscriptions.types';

/**
 * Subscriptions API - handles all subscriptions endpoints
 * Manages filtering, pagination, and sorting
 */
export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<SubscriptionsResponse, SubscriptionsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.size !== undefined) queryParams.append('size', params.size.toString());
        if (params.sort) {
          params.sort.forEach((s) => queryParams.append('sort', s));
        }
        if (params.orderId) queryParams.append('orderId', params.orderId);
        if (params.active !== undefined) queryParams.append('active', params.active.toString());
        if (params.status) queryParams.append('status', params.status);
        if (params.type) queryParams.append('type', params.type);
        if (params.planType) queryParams.append('planType', params.planType);
        if (params.search) queryParams.append('search', params.search);

        return `/subscriptions?${queryParams.toString()}`;
      },
      providesTags: ['Subscription'],
    }),

    getSubscriptionById: builder.query({
      query: (id: string) => `/subscriptions/${id}`,
      providesTags: ['Subscription'],
    }),
  }),
});

export const { useGetSubscriptionsQuery, useGetSubscriptionByIdQuery } = subscriptionsApi;
