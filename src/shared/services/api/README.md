# Separate APIs by Page Strategy

## Overview

Each feature/page now has its own dedicated API client for managing data, filters, pagination, and sorting independently.

## Architecture

### Shared Types

Located in `src/shared/types/`:

- `api.types.ts` - Common API interfaces (PaginationMeta, PaginatedResponse, PaginationParams)
- `students.types.ts` - Student domain model & query parameters
- `discounts.types.ts` - Discount domain model & query parameters
- `subscriptions.types.ts` - Subscription domain model & query parameters
- `orders.types.ts` - Order domain model & query parameters

### API Clients

Located in `src/shared/services/api/`:

- `studentsApi.ts` - Student data fetching with filtering/pagination
- `discountsApi.ts` - Discount/Promo code data fetching
- `subscriptionsApi.ts` - Subscription data fetching
- `ordersApi.ts` - Order data fetching

All APIs use RTK Query and extend the base API from `baseApi.ts`.

## Usage Pattern

Each feature imports and uses its own API client:

```typescript
// In src/features/students/...
import { useGetStudentsQuery } from "@/shared/services/api/studentsApi";
import { StudentsQueryParams } from "@/shared/types/students.types";

const StudentsPage = () => {
  const [queryParams, setQueryParams] = useState<StudentsQueryParams>({
    page: 0,
    size: 10,
    sort: ["lastName,asc"],
  });

  const { data, isLoading, error } = useGetStudentsQuery(queryParams);

  // Handle filtering, sorting, pagination independently
};
```

## Query Parameters

All APIs support:

- `page` (number) - Page number (0-indexed)
- `size` (number) - Items per page
- `sort` (string[]) - Sort criteria in format `property,(asc|desc)`

Example: `sort=['lastName,asc', 'firstName,asc']`

## Feature-Specific Filters

### Students

- `search` - Search by name/email/cne
- `gender` - Filter by gender (MALE, FEMALE)
- `cycle` - Filter by education cycle

### Discounts

- `code` - Search by discount code
- `active` - Filter active discounts only

### Subscriptions

- `orderId` - Filter by order ID
- `active` - Filter active subscriptions only

### Orders

- `status` - Filter by order status (PENDING, PAID, FAILED, CANCELLED)
- `planType` - Filter by plan type (FREEMIUM, BASIC, PREMIUM, ENTERPRISE)
- `studentId` - Filter by student ID
- `dateFrom` / `dateTo` - Filter by date range

## Migration Steps

1. **Features using old shared API** should:
   - Import the appropriate API client from `src/shared/services/api/`
   - Update query parameters to match the new types
   - Update Redux slices/thunks to use the new API (if applicable)
   - Test pagination, filtering, and sorting

2. **Example migration for Students page**:

   ```typescript
   // Before: Using generic student API
   import { useGetStudentQuery } from "@/features/students/...";

   // After: Using dedicated students API client
   import { useGetStudentsQuery } from "@/shared/services/api/studentsApi";
   import { StudentsQueryParams } from "@/shared/types/students.types";
   ```

## Benefits

✅ Each page manages its own API requests independently  
✅ Cleaner separation of concerns  
✅ Easier to add page-specific filters without affecting other pages  
✅ RTK Query caching works per-endpoint  
✅ Type-safe query parameters per resource  
✅ Simpler to test and maintain

## Tag Types

Cache invalidation is handled via RTK Query tags:

- `Student` - Invalidated when student data changes
- `PromoCode` - Invalidated when discount data changes
- `Subscription` - Invalidated when subscription data changes
- `Order` - Invalidated when order data changes

If a mutation (create/update/delete) affects a resource, use:

```typescript
invalidatesTags: ["Student"];
```
