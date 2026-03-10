import { baseApi } from "@/shared/services/baseApi";
import type {
  OrdersResponse,
  OrdersQueryParams,
} from "@/shared/types/orders.types";

/**
 * Orders API - handles all order-related endpoints
 * Manages filtering, pagination, and sorting
 */
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, OrdersQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page !== undefined)
          queryParams.append("page", params.page.toString());
        if (params.size !== undefined)
          queryParams.append("size", params.size.toString());
        if (params.sort) {
          params.sort.forEach((s) => queryParams.append("sort", s));
        }
        if (params.status) queryParams.append("status", params.status);
        if (params.planType) queryParams.append("planType", params.planType);
        if (params.search) queryParams.append("search", params.search);

        return `/orders?${queryParams.toString()}`;
      },
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
