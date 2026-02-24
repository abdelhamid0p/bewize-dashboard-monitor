import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../domain/entities/order";
import type { PaginationMeta } from "../domain/repositories/orders_repository";
import { fetchOrders } from "./orders.thunks";
import {
  buildOrdersCacheKey,
  DEFAULT_PAGE_SIZE,
  normalizeOrdersParams,
} from "./orders.utils";

export type OrdersRequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface OrdersCacheEntry {
  data: Order[];
  meta: PaginationMeta;
  status: OrdersRequestStatus;
  error?: string;
  fetchedAt?: number;
}

interface OrdersState {
  cache: Record<string, OrdersCacheEntry>;
  lastParamsKey?: string;
}

const emptyMeta: PaginationMeta = {
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
};

const initialState: OrdersState = {
  cache: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrdersCache: (state) => {
      state.cache = {};
      state.lastParamsKey = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        const normalized = normalizeOrdersParams(action.meta.arg ?? {});
        const key = buildOrdersCacheKey(normalized);
        const existing = state.cache[key];

        state.cache[key] = {
          data: existing?.data ?? [],
          meta: existing?.meta ?? {
            ...emptyMeta,
            page: normalized.page ?? 0,
            size: normalized.size ?? DEFAULT_PAGE_SIZE,
          },
          status: "loading",
          error: undefined,
          fetchedAt: existing?.fetchedAt,
        };
        state.lastParamsKey = key;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const normalized = normalizeOrdersParams(action.meta.arg ?? {});
        const key = buildOrdersCacheKey(normalized);

        state.cache[key] = {
          data: action.payload.data,
          meta: action.payload.meta,
          status: "succeeded",
          error: undefined,
          fetchedAt: Date.now(),
        };
        state.lastParamsKey = key;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        const normalized = normalizeOrdersParams(action.meta.arg ?? {});
        const key = buildOrdersCacheKey(normalized);
        const existing = state.cache[key];

        state.cache[key] = {
          data: existing?.data ?? [],
          meta: existing?.meta ?? {
            ...emptyMeta,
            page: normalized.page ?? 0,
            size: normalized.size ?? DEFAULT_PAGE_SIZE,
          },
          status: "failed",
          error: action.error.message ?? "Unknown error",
          fetchedAt: existing?.fetchedAt,
        };
        state.lastParamsKey = key;
      });
  },
});

export const { clearOrdersCache } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
