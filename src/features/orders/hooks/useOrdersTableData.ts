import { useState, useCallback } from 'react';
import { useGetOrdersQuery } from '@/shared/services/api/ordersApi';
import type { OrdersQueryParams } from '@/shared/types/orders.types';

/**
 * Hook for managing orders table data with pagination, filtering, and sorting
 * Encapsulates all orders-specific API logic
 */
export const useOrdersTableData = () => {
  const [queryParams, setQueryParams] = useState<OrdersQueryParams>({
    page: 0,
    size: 10,
    sort: ['date,desc'],
  });

  const { data, isLoading, error, refetch } = useGetOrdersQuery(queryParams);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setQueryParams((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setQueryParams((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleStatusFilter = useCallback((status: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, status }));
  }, []);

  const handlePlanTypeFilter = useCallback((planType: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, planType }));
  }, []);

  const handleStudentIdFilter = useCallback((studentId: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, studentId }));
  }, []);

  const handleDateRangeFilter = useCallback((dateFrom: string | undefined, dateTo: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, dateFrom, dateTo }));
  }, []);

  const handleReset = useCallback(() => {
    setQueryParams({
      page: 0,
      size: 10,
      sort: ['date,desc'],
    });
  }, []);

  return {
    // Data
    orders: data?.data || [],
    pagination: data?.meta,
    isLoading,
    error,

    // Actions
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleStatusFilter,
    handlePlanTypeFilter,
    handleStudentIdFilter,
    handleDateRangeFilter,
    handleReset,
    refetch,

    // Current state
    queryParams,
  };
};
