import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../domain/entities/order";
import type {
  OrdersQueryParams,
  OrdersRepository,
  Paginated,
} from "../domain/repositories/orders_repository";
import type { RootState } from "@/app/store/store";
import { buildOrdersCacheKey, normalizeOrdersParams } from "./orders.utils";

interface ThunkExtra {
  ordersRepository: OrdersRepository;
}

export const fetchOrders = createAsyncThunk<
  Paginated<Order>,
  OrdersQueryParams | undefined,
  {
    state: RootState;
    extra: ThunkExtra;
  }
>(
  "orders/fetchOrders",
  async (params, { extra }) => {
    const normalized = normalizeOrdersParams(params ?? {});
    return extra.ordersRepository.getOrders(normalized);
  },
  {
    condition: (params, { getState }) => {
      const state = getState();
      const key = buildOrdersCacheKey(params ?? {});
      const existing = state.orders.cache[key];

      // Fetch if:
      // - No cache entry exists (first time requesting this param combo)
      // - Previous request failed
      // - Status is idle (shouldn't happen, but be safe)
      const shouldFetch =
        !existing || existing.status === "failed" || existing.status === "idle";

      return shouldFetch;
    },
  },
);
