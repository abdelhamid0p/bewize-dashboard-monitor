import { baseApi } from '@/shared/services/baseApi';
import type { CreateDiscountRequest, DiscountResponse } from '../model/discount.types';

export const createDiscountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDiscount: builder.mutation<DiscountResponse, CreateDiscountRequest>({
      query: (body) => ({
        url: '/discounts',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateDiscountMutation } = createDiscountApi;
