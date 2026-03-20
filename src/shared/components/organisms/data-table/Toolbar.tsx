/**
 * Toolbar - Pure UI Component
 * Renders search input and filter controls
 * NO LOGIC - only UI rendering
 */

import { SearchInput } from "@/shared/components/atoms/search-input/search_input";
import { Select, SelectItem } from "@/shared/components/atoms/select/select";
import { DateRangeFilter } from "@/shared/components/ui/date-range-filter";
import { useState } from "react";
import type { ToolbarProps } from "./types";

export function Toolbar({
  searchValue,
  onSearchChange,
  filters = [],
  onFilterChange,
  actions,
}: ToolbarProps) {
  const [dateRanges, setDateRanges] = useState<
    Record<string, { from?: string; to?: string }>
  >({});

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
      <div className="flex items-center w-full sm:w-auto">
        <SearchInput
          placeholder="Rechercher..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2">
        {/* Filters */}
        {filters.map((filter) => {
          if (filter.type === "date-range") {
            const fromKey = filter.fromKey ?? `${filter.key}From`;
            const toKey = filter.toKey ?? `${filter.key}To`;
            const value = dateRanges[filter.key] ?? {};

            return (
              <DateRangeFilter
                key={filter.key}
                label={filter.label}
                value={value}
                onChange={(nextValue) => {
                  setDateRanges((prev) => ({
                    ...prev,
                    [filter.key]: nextValue,
                  }));
                  onFilterChange?.(fromKey, nextValue.from ?? "");
                  onFilterChange?.(toKey, nextValue.to ?? "");
                }}
              />
            );
          }

          if (!filter.options || filter.options.length === 0) {
            return null;
          }

          return (
            <Select
              key={filter.key}
              label={filter.label}
              variant="filtres"
              defaultValue="__all__"
              onChange={(value: string) =>
                onFilterChange?.(filter.key, value === "__all__" ? "" : value)
              }
            >
              <SelectItem value="__all__">{filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          );
        })}

        {/* Custom actions */}
        {actions}
      </div>
    </div>
  );
}
