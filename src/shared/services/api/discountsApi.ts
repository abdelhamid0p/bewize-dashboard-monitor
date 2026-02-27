import { baseApi } from '../baseApi';
import type { DiscountsResponse, DiscountsQueryParams } from '@/shared/types/discounts.types';

/**
 * Discounts API - handles all discount/promo code endpoints
 * Manages filtering, pagination, and sorting
 */
export const discountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscounts: builder.query<DiscountsResponse, DiscountsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined) queryParams.append('page', params.page.toString());
        if (params.size !== undefined) queryParams.append('size', params.size.toString());
        if (params.sort) {
          params.sort.forEach((s) => queryParams.append('sort', s));
        }
        if (params.active !== undefined) queryParams.append('active', params.active.toString());
        if (params.code) queryParams.append('code', params.code);

        return `/discounts?${queryParams.toString()}`;
      },
      providesTags: ['PromoCode'],
    }),

    getDiscountById: builder.query({
      query: (id: string) => `/discounts/${id}`,
      providesTags: ['PromoCode'],
    }),
  }),
});

export const { useGetDiscountsQuery, useGetDiscountByIdQuery } = discountsApi;
