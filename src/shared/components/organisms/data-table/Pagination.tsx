/**
 * Pagination - Pure UI Component
 * Renders pagination controls
 * NO LOGIC - only UI rendering
 */

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { PaginationProps } from "./types";

const FIXED_PAGE_SIZE = 10;

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages } = pagination;
  const [inputValue, setInputValue] = useState<string>(String(page + 1));

  // Powers of 10 that are <= totalPages: 1, 10, 100, 1000, ...
  const jumpOptions: number[] = [];
  let power = 1;
  while (power <= totalPages) {
    jumpOptions.push(power);
    power *= 10;
  }

  const commitPage = (raw: string) => {
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      onPageChange(parsed - 1);
      setInputValue(String(parsed));
    } else {
      setInputValue(String(page + 1));
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 py-1.5 sm:py-2 md:py-3 lg:py-4">
      {/* Page navigation */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
        <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-[#9CA3AF]">
          Page
        </span>

        {/* Previous arrow */}
        <button
          onClick={() => {
            onPageChange(page - 1);
            setInputValue(String(page));
          }}
          disabled={page === 0}
          className="text-[#9CA3AF] hover:text-[#6B7280] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
            strokeWidth={1.5}
          />
        </button>

        {/* Editable current page — purple pill/circle, no spin arrows */}
        <style>{`
          .page-input::-webkit-outer-spin-button,
          .page-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
          .page-input { -moz-appearance: textfield; }
        `}</style>
        <div
          className="flex items-center justify-center rounded-full bg-[#7C3AED] shadow-sm overflow-hidden"
          style={{
            height: "clamp(20px, 3.5vw, 32px)",
            minWidth: "clamp(20px, 3.5vw, 32px)",
            paddingLeft:
              inputValue.length > 2 ? "clamp(6px, 1vw, 10px)" : undefined,
            paddingRight:
              inputValue.length > 2 ? "clamp(6px, 1vw, 10px)" : undefined,
            width: inputValue.length <= 2 ? "clamp(20px, 3.5vw, 32px)" : "auto",
          }}
        >
          <input
            type="number"
            className="page-input text-center text-white bg-transparent border-none outline-none text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-medium cursor-text"
            style={{
              width: `${Math.max(1, inputValue.length)}ch`,
              minWidth: "1ch",
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => commitPage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.target as HTMLInputElement).blur()
            }
            min={1}
            max={totalPages}
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={() => {
            onPageChange(page + 1);
            setInputValue(String(page + 2));
          }}
          disabled={page >= totalPages - 1}
          className="text-[#9CA3AF] hover:text-[#6B7280] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Jump-to dropdown — powers of 10 only, hidden if only [1] */}
      {jumpOptions.length > 1 && (
        <div className="relative inline-flex items-center">
          <select
            value={page + 1}
            onChange={(e) => {
              const target = Number(e.target.value) - 1;
              onPageChange(target);
              setInputValue(String(Number(e.target.value)));
            }}
            className="appearance-none pl-1.5 sm:pl-2 md:pl-2.5 pr-4 sm:pr-5 md:pr-6 py-0.5 md:py-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm border border-[#E5E7EB] rounded-md bg-white text-[#6B7280] cursor-pointer focus:outline-none hover:border-[#D1D5DB]"
          >
            {jumpOptions.map((option) => (
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

export { FIXED_PAGE_SIZE };
