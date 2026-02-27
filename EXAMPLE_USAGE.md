/\*\*

- EXAMPLE: How to use the new separate APIs architecture
-
- This template shows how to migrate a feature to use the dedicated API client
- and hooks for independent data management.
  \*/

// ============================================
// Example: Students Page
// ============================================

import { useStudentsTableData } from '@/features/students/hooks/useStudentsTableData';

export const StudentsPageExample = () => {
const {
students,
pagination,
isLoading,
error,
handlePageChange,
handlePageSizeChange,
handleSort,
handleSearch,
handleGenderFilter,
handleCycleFilter,
queryParams,
} = useStudentsTableData();

const handleReset = () => {
// Reset filters, pagination, sorting
};

return (
<div>
{/_ Filters UI _/}
<input
type="text"
placeholder="Search..."
onChange={(e) => handleSearch(e.target.value)}
/>

      <select onChange={(e) => handleGenderFilter(e.target.value || undefined)}>
        <option value="">All Genders</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort(['firstName,asc'])}>First Name</th>
            <th onClick={() => handleSort(['lastName,asc'])}>Last Name</th>
            <th onClick={() => handleSort(['email,asc'])}>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div>
          <select onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>

          <button disabled={pagination.page === 0} onClick={() => handlePageChange(pagination.page - 1)}>
            Previous
          </button>
          <span>Page {pagination.page + 1} of {pagination.totalPages}</span>
          <button
            disabled={pagination.page >= pagination.totalPages - 1}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading students</p>}
    </div>

);
};

// ============================================
// Example: Orders Page with Advanced Filters
// ============================================

import { useOrdersTableData } from '@/features/orders/hooks/useOrdersTableData';

export const OrdersPageExample = () => {
const {
orders,
pagination,
isLoading,
handlePageChange,
handleStatusFilter,
handlePlanTypeFilter,
handleDateRangeFilter,
queryParams,
} = useOrdersTableData();

return (
<div>
<h2>Orders Management</h2>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => handleStatusFilter(e.target.value || undefined)}>
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select onChange={(e) => handlePlanTypeFilter(e.target.value || undefined)}>
          <option value="">All Plans</option>
          <option value="FREEMIUM">Freemium</option>
          <option value="BASIC">Basic</option>
          <option value="PREMIUM">Premium</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>

        <input
          type="date"
          onChange={(e) =>
            handleDateRangeFilter(
              e.target.value || queryParams.dateFrom,
              queryParams.dateTo
            )
          }
          placeholder="From Date"
        />
      </div>

      {/* Orders Table */}
      <table>
        <thead>
          <tr>
            <th>Order Code</th>
            <th>Student</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Plan Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.code}</td>
              <td>{order.student.firstName} {order.student.lastName}</td>
              <td>${order.amount}</td>
              <td>{order.status}</td>
              <td>{order.planType}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="pagination">
          Page {pagination.page + 1} of {pagination.totalPages}
          <button disabled={pagination.page === 0} onClick={() => handlePageChange(pagination.page - 1)}>
            ← Previous
          </button>
          <button
            disabled={pagination.page >= pagination.totalPages - 1}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {isLoading && <p>Loading orders...</p>}
    </div>

);
};

// ============================================
// Key Benefits of This Approach
// ============================================
/_
✅ Each page has its own independent API client
✅ Filters/pagination are isolated per page (no cross-contamination)
✅ Easy to test (mock studentsApi, discountsApi, etc. separately)
✅ Type-safe with specific QueryParams types
✅ RTK Query caching works efficiently per-endpoint
✅ Clean separation of concerns
✅ Simple to add new filters without affecting other pages
_/
