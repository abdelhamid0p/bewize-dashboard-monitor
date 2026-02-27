import { useState, useCallback, useMemo } from 'react';
import { useGetSubscriptionsQuery } from '../api/subscriptionsApi';
import type { SubscriptionsQueryParams, Subscription } from '@/shared/types/subscriptions.types';
import type { SubscriptionRow } from '../types';

/**
 * Simple mapper from Subscription API response to SubscriptionRow for table display
 */
const mapSubscriptionToRow = (subscription: Subscription): SubscriptionRow => ({
  ...subscription,
  // Add computed status field
  status: (() => {
    const end = new Date(subscription.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return end >= today ? 'active' : 'inactive';
  })(),
});

/**
 * Hook for managing subscriptions table data with pagination, filtering, and sorting
 * Uses the Subscriptions API to fetch subscription data directly
 * Encapsulates all subscriptions-specific API logic
 */
export const useSubscriptionsTableData = (config?: { pageSize?: number }) => {
  const [filters, setFilters] = useState<SubscriptionsQueryParams>({
    page: 0,
    size: config?.pageSize ?? 10,
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Build query params for subscriptions API
  const queryParams: SubscriptionsQueryParams = {
    page: filters.page,
    size: filters.size,
    orderId: filters.orderId,
    active: filters.active,
    sort: filters.sort,
  };

  const { data, isLoading, error, refetch } = useGetSubscriptionsQuery(queryParams);

  // Map subscriptions data to table format
  const subscriptionRows = useMemo(() => {
    return data?.data?.map(mapSubscriptionToRow) || [];
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

  const handleOrderIdFilter = useCallback((orderId: string | undefined) => {
    setFilters((prev) => ({ ...prev, page: 0, orderId }));
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
    data: subscriptionRows,
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
    filters,
    searchTerm,
  };
};

