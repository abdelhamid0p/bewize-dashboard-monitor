import { useState, useCallback } from 'react';
import { useGetDiscountsQuery } from '@/shared/services/api/discountsApi';
import type { DiscountsQueryParams } from '@/shared/types/discounts.types';

/**
 * Hook for managing discounts/promo codes table data with pagination, filtering, and sorting
 * Encapsulates all discounts-specific API logic
 */
export const useDiscountsTableData = () => {
  const [queryParams, setQueryParams] = useState<DiscountsQueryParams>({
    page: 0,
    size: 10,
    sort: ['code,asc'],
  });

  const { data, isLoading, error, refetch } = useGetDiscountsQuery(queryParams);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setQueryParams((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setQueryParams((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleCodeSearch = useCallback((code: string) => {
    setQueryParams((prev) => ({ ...prev, page: 0, code: code || undefined }));
  }, []);

  const handleActiveFilter = useCallback((active: boolean | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, active }));
  }, []);

  const handleReset = useCallback(() => {
    setQueryParams({
      page: 0,
      size: 10,
      sort: ['code,asc'],
    });
  }, []);

  return {
    // Data
    discounts: data?.data || [],
    pagination: data?.meta,
    isLoading,
    error,

    // Actions
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleCodeSearch,
    handleActiveFilter,
    handleReset,
    refetch,

    // Current state
    queryParams,
  };
};
