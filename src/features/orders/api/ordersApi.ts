import { baseApi } from "@/shared/services/baseApi";
import type {
  OrdersResponse,
  OrdersQueryParams,
} from "@/shared/types/orders.types";
import { ORDERS_COLUMNS } from "../config";

const ORDER_FIELDS = ORDERS_COLUMNS.map((column) => column.key).filter((key) => key !== "actions");

type FilterOptionsResponse = Record<string, Array<{ label: string; value: string }>>;

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
        const requestedFields = params.fields?.length ? params.fields : ORDER_FIELDS;
        requestedFields.forEach((field) => queryParams.append("fields", field));

        return `/datatable/orders?${queryParams.toString()}`;
      },
      providesTags: ["Order"],
    }),
    getOrderFilterOptions: builder.query<FilterOptionsResponse, void>({
      query: () => "/datatable/orders/filters",
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderFilterOptionsQuery } = ordersApi;
