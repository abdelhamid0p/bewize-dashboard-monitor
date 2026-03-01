/**
 * usePromoCodesTable - Hook containing ALL table logic
 */

import { useMemo, useState, useCallback } from "react";
import { useGetDiscountsQuery } from "../api/discountsApi";
import { mapPromoCodeToUI } from "../config/mapper";
import type { PromoCodeUI, PromoCodesFilters, PromoCodeBackend } from "../model/promo-code.types";
import type { SortState, PaginationState } from "@/shared/components/organisms/data-table";

interface UsePromoCodesTableOptions {
  pageSize?: number;
}

interface UsePromoCodesTableResult {
  data: PromoCodeUI[];
  loading: boolean;
  error: Error | null;
  pagination: PaginationState;
  filters: PromoCodesFilters;
  searchTerm: string;
  sort: SortState[];
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleSort: (field: string) => void;
}

export const usePromoCodesTable = (
  options: UsePromoCodesTableOptions = {}
): UsePromoCodesTableResult => {
  const pageSize = options.pageSize ?? 20;

  const [filters, setFilters] = useState<PromoCodesFilters>({
    page: 0,
    size: pageSize,
  });
  const [searchTerm, setSearchTermState] = useState("");
  const [sort, setSort] = useState<SortState[]>([]);

  // Build query params - include all filters dynamically
  const queryParams = {
    ...filters,  // Spread all filters (page, size, active, percentage, etc.)
    search: searchTerm || undefined,
    sort: sort.length > 0 
      ? sort.map((s) => `${s.field},${s.direction}`) 
      : undefined,
  };

  // API call - RTK Query automatically refetches when queryParams change
  const { data: apiData, isLoading, error } = useGetDiscountsQuery(queryParams);

  const data = useMemo(() => {
    if (!apiData) return [];
    
    // Handle both array and paginated response formats
    const discounts = Array.isArray(apiData) ? apiData : apiData?.data || [];
    return discounts.map((d) => mapPromoCodeToUI(d as unknown as PromoCodeBackend));
  }, [apiData]);

  const pagination: PaginationState = useMemo(() => {
    if (!apiData) {
      return {
        page: 0,
        size: pageSize,
        totalElements: 0,
        totalPages: 0,
      };
    }
    
    // Handle both array and paginated response formats
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

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ 
      ...prev, 
      [key]: value || undefined,
      page: 0 
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
