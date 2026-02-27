import { useState, useCallback } from 'react';
import { useGetDiscountsQuery } from '../api/discountsApi';
import type { DiscountsQueryParams } from '@/shared/types/discounts.types';

/**
 * Hook for managing discounts/promo codes table data with pagination, filtering, and sorting
 * Uses the Discounts API to fetch discount data directly
 * Encapsulates all discounts-specific API logic
 */
export const useDiscountsTableData = (config?: { pageSize?: number }) => {
  const [filters, setFilters] = useState<DiscountsQueryParams>({
    page: 0,
    size: config?.pageSize ?? 10,
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Build query params for discounts API
  const queryParams: DiscountsQueryParams = {
    page: filters.page,
    size: filters.size,
    code: searchTerm || filters.code,
    active: filters.active,
    sort: filters.sort,
  };

  const { data, isLoading, error, refetch } = useGetDiscountsQuery(queryParams);

  // Use discounts data directly
  const discountData = data?.data || [];

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setFilters((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setFilters((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleCodeSearch = useCallback((code: string) => {
    setSearchTerm(code);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleActiveFilter = useCallback((active: boolean | undefined) => {
    setFilters((prev) => ({ ...prev, page: 0, active }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      page: 0,
      size: config?.pageSize ?? 10,
    });
    setSearchTerm('');
  }, [config?.pageSize]);

  return {
    // Data - compatible with TablePage component
    data: discountData as any[],
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
    filters,
    searchTerm,
  };
};
