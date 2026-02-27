import { useState, useCallback } from 'react';
import { useGetStudentsQuery } from '../api/studentsApi';
import type { StudentsQueryParams } from '@/shared/types/students.types';

/**
 * Hook for managing students table data with pagination, filtering, and sorting
 * Uses the Students API to fetch student data directly
 * Encapsulates all students-specific API logic
 */
export const useStudentsTableData = (config?: { pageSize?: number }) => {
  const [filters, setFilters] = useState<StudentsQueryParams>({
    page: 0,
    size: config?.pageSize ?? 10,
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Build query params for students API
  const queryParams: StudentsQueryParams = {
    page: filters.page,
    size: filters.size,
    search: searchTerm || undefined,
    gender: filters.gender,
    cycle: filters.cycle,
    sort: filters.sort,
  };

  const { data, isLoading, error, refetch } = useGetStudentsQuery(queryParams);

  // Use students data directly
  const studentData = data?.data || [];

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setFilters((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setFilters((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchTerm(search);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleGenderFilter = useCallback((gender: string | undefined) => {
    setFilters((prev) => ({ ...prev, page: 0, gender }));
  }, []);

  const handleCycleFilter = useCallback((cycle: string | undefined) => {
    setFilters((prev) => ({ ...prev, page: 0, cycle }));
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
    data: studentData as any[],
    pagination: data?.meta,
    isLoading,
    error,

    // Actions
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleSearch,
    handleGenderFilter,
    handleCycleFilter,
    handleReset,
    refetch,

    // Current state
    filters,
    searchTerm,
  };
};
