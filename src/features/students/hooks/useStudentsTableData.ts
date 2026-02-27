import { useState, useCallback } from 'react';
import { useGetStudentsQuery } from '@/shared/services/api/studentsApi';
import type { StudentsQueryParams } from '@/shared/types/students.types';

/**
 * Hook for managing students table data with pagination, filtering, and sorting
 * Encapsulates all students-specific API logic
 */
export const useStudentsTableData = () => {
  const [queryParams, setQueryParams] = useState<StudentsQueryParams>({
    page: 0,
    size: 10,
    sort: ['lastName,asc'],
  });

  const { data, isLoading, error, refetch } = useGetStudentsQuery(queryParams);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setQueryParams((prev) => ({ ...prev, page: 0, size: newSize }));
  }, []);

  const handleSort = useCallback((sortCriteria: string[]) => {
    setQueryParams((prev) => ({ ...prev, page: 0, sort: sortCriteria }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setQueryParams((prev) => ({ ...prev, page: 0, search: search || undefined }));
  }, []);

  const handleGenderFilter = useCallback((gender: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, gender }));
  }, []);

  const handleCycleFilter = useCallback((cycle: string | undefined) => {
    setQueryParams((prev) => ({ ...prev, page: 0, cycle }));
  }, []);

  const handleReset = useCallback(() => {
    setQueryParams({
      page: 0,
      size: 10,
      sort: ['lastName,asc'],
    });
  }, []);

  return {
    // Data
    students: data?.data || [],
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
    queryParams,
  };
};
