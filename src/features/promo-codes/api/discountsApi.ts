import { baseApi } from '@/shared/services/baseApi';
import type { DiscountsResponse, DiscountsQueryParams } from '@/shared/types/discounts.types';
import { PROMO_CODES_COLUMNS } from '../config';

const DISCOUNT_FIELDS = PROMO_CODES_COLUMNS.map((column) => column.key).filter((key) => key !== 'actions');

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
        if (params.percentage) queryParams.append('percentage', params.percentage);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        if (params.search) queryParams.append('search', params.search);
        const requestedFields = params.fields?.length ? params.fields : DISCOUNT_FIELDS;
        requestedFields.forEach((field) => queryParams.append('fields', field));

        return `/datatable/discounts?${queryParams.toString()}`;
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
