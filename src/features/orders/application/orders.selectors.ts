import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import type {
  OrdersQueryParams,
  PaginationMeta,
} from "../domain/repositories/orders_repository";
import {
  buildOrdersCacheKey,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  normalizeOrdersParams,
} from "./orders.utils";

const emptyMeta: PaginationMeta = {
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
};

// Base selector to get the entire orders state
const selectOrdersState = (state: RootState) => state.orders;

/**
 * Get the cache entry for a specific set of parameters
 * This is parameterized, so we create a new selector with closure over params
 */
export const selectOrdersEntry = (
  state: RootState,
  params: OrdersQueryParams = {},
) => {
  const key = buildOrdersCacheKey(params);
  return state.orders.cache[key];
};

/**
 * Memoized selector for orders data
 * Uses createSelector to ensure consistent object references
 */
export const selectOrdersData = createSelector(
  [selectOrdersState, (_state: RootState, params: OrdersQueryParams = {}) => params],
  (ordersState, params) => {
    const key = buildOrdersCacheKey(params);
    return ordersState.cache[key]?.data ?? [];
  },
);

/**
 * Memoized selector for pagination metadata
 */
export const selectOrdersMeta = createSelector(
  [selectOrdersState, (_state: RootState, params: OrdersQueryParams = {}) => params],
  (ordersState, params) => {
    const key = buildOrdersCacheKey(params);
    const entry = ordersState.cache[key];

    if (entry?.meta) {
      return entry.meta;
    }

    const normalized = normalizeOrdersParams(params);
    return {
      ...emptyMeta,
      page: normalized.page ?? DEFAULT_PAGE,
      size: normalized.size ?? DEFAULT_PAGE_SIZE,
    };
  },
);

/**
 * Memoized selector for loading status
 */
export const selectOrdersStatus = createSelector(
  [selectOrdersState, (_state: RootState, params: OrdersQueryParams = {}) => params],
  (ordersState, params) => {
    const key = buildOrdersCacheKey(params);
    return ordersState.cache[key]?.status ?? "idle";
  },
);

/**
 * Memoized selector for errors
 */
export const selectOrdersError = createSelector(
  [selectOrdersState, (_state: RootState, params: OrdersQueryParams = {}) => params],
  (ordersState, params) => {
    const key = buildOrdersCacheKey(params);
    const entry = ordersState.cache[key];

    if (!entry?.error) {
      return null;
    }

    return new Error(entry.error);
  },
);
