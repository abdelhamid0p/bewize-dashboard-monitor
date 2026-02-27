import { useState, useCallback, useMemo } from 'react';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/api.types';

/**
 * Generic hook for managing table data with RTK Query API clients
 * Works with any API query result that returns paginated data
 *
 * @example
 * const { data, pagination, isLoading, ... } = useTableDataFromQuery({
 *   useQueryHook: useGetOrdersQuery,
 *   buildQueryParams: (filters) => ({ ...filters, page: 0, size: 10 }),
 *   mapRows: (data) => data.map(order => ({ ...order })),
 * });
 */
export interface UseTableDataConfig<TQueryParam, TData, TRow> {
  /** RTK Query hook that returns UseQuery result */
  useQueryHook: (params: TQueryParam) => any;
  /** Function to build query params from filters and search */
  buildQueryParams: (filters: any, searchTerm?: string) => TQueryParam;
  /** Optional function to map API data to table rows */
  mapRows?: (data: TData[]) => TRow[];
  /** Initial page size */
  pageSize?: number;
}

export interface TableState<TRow> {
  data: TRow[];
  pagination: any;
  isLoading: boolean;
  error: any;
  queryParams: any;
}

/**
 * Hook for table data fetching using RTK Query
 * Handles pagination, filtering, searching, and sorting
 */
export const useTableDataFromQuery = <TQueryParam extends PaginationParams, TData, TRow = TData>({
  useQueryHook,
  buildQueryParams,
  mapRows,
  pageSize = 10,
}: UseTableDataConfig<TQueryParam, TData, TRow>) => {
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Build query params from current filters and search
  const queryParams = useMemo(
    () =>
      buildQueryParams(
        { ...filters, page: filters.page ?? 0, size: filters.size ?? pageSize },
        searchTerm
      ),
    [filters, searchTerm, pageSize, buildQueryParams]
  );

  // Execute query
  const { data, isLoading, error, refetch } = useQueryHook(queryParams);

  // Map rows if mapper provided
  const mappedRows = useMemo(() => {
    if (!data?.data) return [];
    return mapRows ? mapRows(data.data) : (data.data as TRow[]);
  }, [data, mapRows]);

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters, page: 0 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev: any) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setFilters((prev: any) => ({ ...prev, size, page: 0 }));
  }, []);

  const handleSort = useCallback((sort: string[]) => {
    setFilters((prev: any) => ({ ...prev, sort, page: 0 }));
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleReset = useCallback(() => {
    setFilters({ page: 0, size: pageSize });
    setSearchTerm('');
  }, [pageSize]);

  return {
    // Data
    data: mappedRows,
    pagination: data?.meta,
    isLoading,
    error,

    // Actions
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleSearch,
    handleReset,
    refetch,

    // Current state
    queryParams,
    filters,
    searchTerm,
  };
};
