/**
 * RTK Query base API: shared base URL, auth headers, and default options.
 * Base URL from VITE_API_BASE_URL (default /api/v1).
 * If requests fail with CORS, configure Spring Boot to allow this app's origin.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getStoredToken } from '@/shared/storage/authStorage';

function getBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (base && typeof base === 'string' && base.trim()) {
    const trimmed = base.trim();
    return trimmed.startsWith('http')
      ? trimmed.replace(/\/$/, '')
      : `${window.location.origin}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`.replace(/\/$/, '');
  }
  return '/api/v1';
}

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders(headers) {
    const token = getStoredToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Order', 'PromoCode', 'Student', 'Subscription'],
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60,
});
