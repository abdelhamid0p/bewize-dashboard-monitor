/**
 * Pagination - Pure UI Component
 * Renders pagination controls
 * NO LOGIC - only UI rendering
 */

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { PaginationProps } from "./types";

export function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
}: PaginationProps) {
  const { page, size, totalPages } = pagination;

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 py-1.5 sm:py-2 md:py-3 lg:py-4">
      {/* Page navigation */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
        <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-[#9CA3AF]">
          Page
        </span>

        {/* Previous arrow */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="text-[#9CA3AF] hover:text-[#6B7280] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
            strokeWidth={1.5}
          />
        </button>

        {/* Current page in purple circle */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-[#7C3AED] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-medium shadow-sm">
          {page + 1}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="text-[#9CA3AF] hover:text-[#6B7280] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="relative inline-flex items-center">
          <select
            value={size}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none pl-1.5 sm:pl-2 md:pl-2.5 pr-4 sm:pr-5 md:pr-6 py-0.5 md:py-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm border border-[#E5E7EB] rounded-md bg-white text-[#6B7280] cursor-pointer focus:outline-none hover:border-[#D1D5DB]"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-0.5 sm:right-1 md:right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#9CA3AF] pointer-events-none"
            strokeWidth={2}
          />
        </div>
      )}
    </div>
  );
}
