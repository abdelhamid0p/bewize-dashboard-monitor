import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchOrders } from "./orders.thunks";
import {
  selectOrdersData,
  selectOrdersError,
  selectOrdersMeta,
  selectOrdersStatus,
} from "./orders.selectors";
import type { Order } from "../domain/entities/order";
import type { OrdersQueryParams } from "../domain/repositories/orders_repository";
import type { UseTableDataResult } from "@/features/tables/types";
import { normalizeOrdersParams } from "./orders.utils";

interface SortCriterion {
  field: string;
  direction: "asc" | "desc";
}

interface UseOrdersTableDataOptions<
  TUI,
  TFilters extends Record<string, any>,
> {
  pageSize: number;
  initialFilters?: Partial<TFilters>;
  mapRows: (orders: Order[], meta: ReturnType<typeof selectOrdersMeta>) => TUI[];
  toQueryParams?: (filters: TFilters, searchTerm: string) => OrdersQueryParams;
}

export function useOrdersTableData<
  TUI,
  TFilters extends Record<string, any>,
>({
  pageSize,
  initialFilters,
  mapRows,
  toQueryParams,
}: UseOrdersTableDataOptions<TUI, TFilters>): UseTableDataResult<TUI, TFilters> {
  const [filters, setFilters] = useState<TFilters>({
    page: 0,
    size: pageSize,
    ...initialFilters,
  } as unknown as TFilters);
  const [searchTerm, setSearchTermState] = useState("");
  const [sort, setSort] = useState<SortCriterion[]>([]);

   const queryParams = useMemo(() => {
    if (toQueryParams) {
      const params = toQueryParams(filters, searchTerm);
      const normalizedParams = normalizeOrdersParams(params);
      if (sort.length > 0) {
        return {
          ...normalizedParams,
          sort: sort.map((s) => `${s.field},${s.direction}`).join(";"),
        };
      }
      return normalizedParams;
    }

    const baseParams = {
      ...filters,
      search: searchTerm,
    } as OrdersQueryParams;

    const normalizedParams = normalizeOrdersParams(baseParams);
    if (sort.length > 0) {
      return {
        ...normalizedParams,
        sort: sort.map((s) => `${s.field},${s.direction}`).join(";"),
      };
    }
    return normalizedParams;
  }, [filters, searchTerm, toQueryParams, sort]);

  
  const dispatch = useAppDispatch();
  const orders = useAppSelector(
    (state) => selectOrdersData(state, queryParams),
    (prev, next) => prev === next,
  );
  const pagination = useAppSelector(
    (state) => selectOrdersMeta(state, queryParams),
    (prev, next) => prev === next,
  );
  const status = useAppSelector(
    (state) => selectOrdersStatus(state, queryParams),
    (prev, next) => prev === next,
  );
  const error = useAppSelector(
    (state) => selectOrdersError(state, queryParams),
    (prev, next) => {
      if (prev === next) return true;
      if (!prev && !next) return true;
      if (!prev || !next) return false;
      return prev.message === next.message;
    },
  );

  const data = useMemo(() => mapRows(orders, pagination), [orders, pagination, mapRows]);

  useEffect(() => {
    dispatch(fetchOrders(queryParams));
  }, [dispatch, queryParams]);

  const updateFilters = (newFilters: Partial<TFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 0,
    }));
  };

  const goToPage = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchTerm = (term: string) => {
    setSearchTermState(term);
    setFilters((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const toggleSort = (field: string) => {
    setSort((prevSort) => {
      const existing = prevSort.find((s) => s.field === field);
      if (existing) {
        // Toggle direction: asc -> desc -> remove
        if (existing.direction === "asc") {
          return prevSort.map((s) =>
            s.field === field ? { ...s, direction: "desc" } : s
          );
        } else {
          // Remove on third click
          return prevSort.filter((s) => s.field !== field);
        }
      } else {
        // Add new sort criterion (multi-sort)
        return [...prevSort, { field, direction: "asc" }];
      }
    });
  };

  const clearSort = () => {
    setSort([]);
  };

  return {
    data,
    loading: status === "loading" || status === "idle",
    error,
    pagination,
    filters,
    searchTerm,
    updateFilters,
    goToPage,
    setSearchTerm,
    sort,
    toggleSort,
    clearSort,
  };
}
