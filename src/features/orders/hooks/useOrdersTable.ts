/**
 * useOrdersTable - Hook containing ALL table logic
 *
 * Handles:
 * - API calls (via RTK Query)
 * - Pagination state
 * - Filtering state
 * - Sorting state
 * - Data transformation
 */

import { useMemo, useState, useCallback } from "react";
import { useGetOrdersQuery } from "../api/ordersApi";
import { mapOrderToUI } from "../config/mapper";
import type { OrderUI, OrdersFilters, OrderBackend } from "../model/order.types";
import type {
  SortState,
  PaginationState,
} from "@/shared/components/organisms/data-table";

interface UseOrdersTableOptions {
  pageSize?: number;
}

interface UseOrdersTableResult {
  data: OrderUI[];
  loading: boolean;
  error: Error | null;
  pagination: PaginationState;
  filters: OrdersFilters;
  searchTerm: string;
  sort: SortState[];
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleSort: (field: string) => void;
}

export const useOrdersTable = (
  options: UseOrdersTableOptions = {},
): UseOrdersTableResult => {
  const pageSize = options.pageSize ?? 20;

  const [filters, setFilters] = useState<OrdersFilters>({
    page: 0,
    size: pageSize,
  });
  const [searchTerm, setSearchTermState] = useState("");
  const [sort, setSort] = useState<SortState[]>([]);

  // Build query params
  const queryParams = {
    ...filters,
    search: searchTerm || undefined,
    sort:
      sort.length > 0
        ? sort.map((s) => `${s.field},${s.direction}`)
        : undefined,
  };

  // API call
  const { data: apiData, isLoading, error } = useGetOrdersQuery(queryParams);

  // Transform data to UI format
  const data = useMemo(() => {
    if (!apiData) return [];

    const orders = Array.isArray(apiData) ? apiData : apiData?.data || [];
    const mapped = orders.map((o) =>
      mapOrderToUI(o as unknown as OrderBackend),
    );

    if (Array.isArray(apiData)) {
      const page = filters.page ?? 0;
      const size = filters.size ?? pageSize;
      const startIndex = page * size;
      return mapped.slice(startIndex, startIndex + size);
    }

    return mapped;
  }, [apiData, filters.page, filters.size, pageSize]);

  // Pagination state
  const pagination: PaginationState = useMemo(() => {
    if (!apiData) {
      return { page: 0, size: pageSize, totalElements: 0, totalPages: 0 };
    }

    if (Array.isArray(apiData)) {
      return {
        page: filters.page ?? 0,
        size: filters.size ?? pageSize,
        totalElements: apiData.length,
        totalPages: Math.ceil(apiData.length / (filters.size ?? pageSize)),
      };
    }

    return {
      page: apiData.meta?.page ?? 0,
      size: apiData.meta?.size ?? pageSize,
      totalElements: apiData.meta?.totalElements ?? 0,
      totalPages: apiData.meta?.totalPages ?? 0,
    };
  }, [apiData, pageSize, filters.page, filters.size]);

  // Actions
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 0,
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page: Math.max(0, page) }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, size, page: 0 }));
  }, []);

  const toggleSort = useCallback((field: string) => {
    setSort((prev) => {
      const existing = prev.find((s) => s.field === field);
      if (!existing) return [{ field, direction: "asc" }];
      if (existing.direction === "asc") return [{ field, direction: "desc" }];
      return [];
    });
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  return {
    data,
    loading: isLoading,
    error: error instanceof Error ? error : null,
    pagination,
    filters,
    searchTerm,
    sort,
    setSearchTerm,
    setFilter,
    goToPage,
    setPageSize,
    toggleSort,
  };
};
