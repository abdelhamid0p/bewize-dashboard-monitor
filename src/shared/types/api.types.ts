/**
 * Common API response types with pagination metadata
 */

export interface PaginationMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Query parameters for paginated/filtered requests
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string[];
}
