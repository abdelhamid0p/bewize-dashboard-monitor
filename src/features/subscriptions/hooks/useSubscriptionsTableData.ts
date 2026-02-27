import { useState, useCallback } from 'react';
import { useGetSubscriptionsQuery } from '@/shared/services/api/subscriptionsApi';
import type { SubscriptionsQueryParams } from '@/shared/types/subscriptions.types';

/**
 * Hook for managing subscriptions table data with pagination, filtering, and sorting
 * Encapsulates all subscriptions-specific API logic
 */
export const useSubscriptionsTableData = () => {
  const [queryParams, setQueryParams] = useState<SubscriptionsQueryParams>({
    page: 0,
    size: 10,
    sort: ['startDate,desc'],
  });

  const { data, isLoading, error, refetch } = useGetSubscriptionsQuery(queryParams);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setQueryParams((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setQueryParams((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleOrderIdFilter = useCallback((orderId: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, orderId }));
  }, []);

  const handleActiveFilter = useCallback((active: boolean | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, active }));
  }, []);

  const handleReset = useCallback(() => {
    setQueryParams({
      page: 0,
      size: 10,
      sort: ['startDate,desc'],
    });
  }, []);

  return {
    // Data
    subscriptions: data?.data || [],
    pagination: data?.meta,
    isLoading,
    error,

    // Actions
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleOrderIdFilter,
    handleActiveFilter,
    handleReset,
    refetch,

    // Current state
    queryParams,
  };
};
