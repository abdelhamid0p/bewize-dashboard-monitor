import { useState, useCallback, useMemo } from 'react';
import { useGetDiscountsQuery } from '../api/discountsApi';
import type { DiscountsQueryParams, Discount } from '@/shared/types/discounts.types';
import type { PromoCodeRow } from '../types';

/**
 * Simple mapper from Discount API response to PromoCodeRow for table display
 */
const mapDiscountToRow = (discount: Discount): PromoCodeRow => ({
  ...discount,
  // Add computed status field
  status: (() => {
    const end = new Date(discount.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return end >= today ? 'active' : 'expired';
  })(),
});

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

  // Map discounts data to table format
  const promoCodeRows = useMemo(() => {
    return data?.data?.map(mapDiscountToRow) || [];
  }, [data?.data]);

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
    data: promoCodeRows,
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
