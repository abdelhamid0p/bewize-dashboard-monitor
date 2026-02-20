/**
 * Generic hook for managing table data, pagination, filters, and search
 * This hook handles all the logic that was previously duplicated across entity-specific hooks
 */

import { useState, useEffect } from "react";
import type { TableConfig, UseTableDataResult, PaginationMeta } from "../types";

export function useTableData<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>
>(
  config: TableConfig<TBackend, TUI, TFilters>,
  initialFilters: Partial<TFilters> = {}
): UseTableDataResult<TUI, TFilters> {
  const pageSize = config.pageSize || 10;

  // State management
  const [data, setData] = useState<TUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 0,
    size: pageSize,
    totalElements: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<TFilters>({
    page: 0,
    size: pageSize,
    ...initialFilters,
  } as unknown as TFilters);
  const [searchTerm, setSearchTermState] = useState("");

  // Data fetching effect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add search to filters
        const filtersWithSearch = {
          ...filters,
          ...(searchTerm && { search: searchTerm }),
        };

        // Call the configured fetcher
        const response = await config.fetcher(filtersWithSearch);

        // Transform each backend item using the mapper
        const mappedData = response.data.map(config.mapper);

        setData(mappedData);
        setPagination(response.meta);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, searchTerm, config]);

  // Update filters and reset to page 0
  const updateFilters = (newFilters: Partial<TFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 0, // Reset pagination when filters change
    }));
  };

  // Go to a specific page
  const goToPage = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  // Update search term and reset to page 0
  const setSearchTerm = (term: string) => {
    setSearchTermState(term);
    setFilters((prev) => ({
      ...prev,
      page: 0, // Reset pagination when searching
    }));
  };

  return {
    data,
    loading,
    error,
    pagination,
    filters,
    searchTerm,
    updateFilters,
    goToPage,
    setSearchTerm,
  };
}
