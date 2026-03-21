/**
 * useStudentsTable - Hook containing ALL table logic
 * 
 * Handles:
 * - API calls (via RTK Query)
 * - Pagination state
 * - Filtering state  
 * - Sorting state
 * - Data transformation
 */

import { useMemo, useState, useCallback } from "react";
import { useGetStudentsQuery } from "../api/studentsApi";
import { mapStudentToUI } from "../config/mapper";
import type { StudentUI, StudentsFilters, StudentBackend } from "../model/student.types";
import type { SortState, PaginationState } from "@/shared/components/organisms/data-table";
import { FIXED_PAGE_SIZE } from "@/shared/components/organisms/data-table/Pagination";

interface UseStudentsTableOptions {
  pageSize?: number;
}

interface UseStudentsTableResult {
  // Data
  data: StudentUI[];
  loading: boolean;
  error: Error | null;
  pagination: PaginationState;
  
  // State
  filters: StudentsFilters;
  searchTerm: string;
  sort: SortState[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: string) => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleSort: (field: string) => void;
}

export const useStudentsTable = (
  options: UseStudentsTableOptions = {}
): UseStudentsTableResult => {
  const pageSize = options.pageSize ?? FIXED_PAGE_SIZE;

  // State
  const [filters, setFilters] = useState<StudentsFilters>({
    page: 0,
    size: pageSize,
  });
  const [searchTerm, setSearchTermState] = useState("");
  const [sort, setSort] = useState<SortState[]>([]);

  // Build query params - include all filters dynamically
  const queryParams = {
    ...filters,  // Spread all filters (page, size, gender, deviceType, level, type, planType, etc.)
    search: searchTerm || undefined,
    sort: sort.length > 0 
      ? sort.map((s) => `${s.field},${s.direction}`) 
      : undefined,
  };

  // API call - RTK Query automatically refetches when queryParams change
  const { data: apiData, isLoading, error } = useGetStudentsQuery(queryParams);

  // Transform data to UI format
  const data = useMemo(() => {
    if (!apiData) return [];
    
    // Handle both array and paginated response formats
    const students = Array.isArray(apiData) ? apiData : apiData?.data || [];
    const mapped = students.map((s) => mapStudentToUI(s as unknown as StudentBackend));
    
    // If API returns an array (not paginated), do client-side pagination
    if (Array.isArray(apiData)) {
      const page = filters.page ?? 0;
      const size = filters.size ?? pageSize;
      const startIndex = page * size;
      return mapped.slice(startIndex, startIndex + size);
    }
    
    return mapped;
  }, [apiData, filters.page, filters.size, pageSize]);

  // Pagination state
  const pagination: PaginationState = useMemo(() => {
    if (!apiData) {
      return {
        page: 0,
        size: pageSize,
        totalElements: 0,
        totalPages: 0,
      };
    }
    
    // Handle both array and paginated response formats
    if (Array.isArray(apiData)) {
      return {
        page: filters.page ?? 0,
        size: filters.size ?? pageSize,
        totalElements: apiData.length,
        totalPages: Math.ceil(apiData.length / (filters.size ?? pageSize)),
      };
    }
    
    return {
      page: apiData.meta?.page ?? 0,
      size: apiData.meta?.size ?? pageSize,
      totalElements: apiData.meta?.totalElements ?? 0,
      totalPages: apiData.meta?.totalPages ?? 0,
    };
  }, [apiData, pageSize, filters.page, filters.size]);

  // Actions
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ 
      ...prev, 
      [key]: value || undefined,
      page: 0 
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page: Math.max(0, page) }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setFilters((prev) => ({ ...prev, size, page: 0 }));
  }, []);

  const toggleSort = useCallback((field: string) => {
    setSort((prev) => {
      const existing = prev.find((s) => s.field === field);
      if (!existing) {
        return [{ field, direction: "asc" }];
      }
      if (existing.direction === "asc") {
        return [{ field, direction: "desc" }];
      }
      return [];
    });
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  return {
    data,
    loading: isLoading,
    error: error instanceof Error ? error : null,
    pagination,
    filters,
    searchTerm,
    sort,
    setSearchTerm,
    setFilter,
    goToPage,
    setPageSize,
    toggleSort,
  };
};
