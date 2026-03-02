/**
 * Toolbar - Pure UI Component
 * Renders search input and filter controls
 * NO LOGIC - only UI rendering
 */

import { SearchInput } from "@/shared/components/atoms/search-input/search_input";
import { Select, SelectItem } from "@/shared/components/atoms/select/select";
import type { ToolbarProps } from "./types";

export function Toolbar({
  searchValue,
  onSearchChange,
  filters = [],
  onFilterChange,
  actions,
}: ToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-3 lg:gap-4">
      <div className="flex items-center w-full md:w-auto">
        <SearchInput
          placeholder="Rechercher..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-1 md:gap-1.5 lg:gap-2">
        {/* Filters */}
        {filters
          .filter((filter) => filter.options && filter.options.length > 0)
          .map((filter) => (
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
          ))}

        {/* Custom actions */}
        {actions}
      </div>
    </div>
  );
}
