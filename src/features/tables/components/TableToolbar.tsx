/**
 * Generic TableToolbar component
 * Handles search and filter controls for any table
 */

import { SearchInput } from "@/components/atoms/search-input/search_input";
import { Select, SelectItem } from "@/components/atoms/select/select";
import type { TableConfig, UseTableDataResult, FilterConfig } from "../types";

interface TableToolbarProps<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
> {
  /** Table configuration */
  config: TableConfig<TBackend, TUI, TFilters>;

  /** Data state and handlers from useTableData hook */
  tableState: UseTableDataResult<TUI, TFilters>;
}

export function TableToolbar<
  TBackend = any,
  TUI = any,
  TFilters extends Record<string, any> = Record<string, any>,
>({ config, tableState }: TableToolbarProps<TBackend, TUI, TFilters>) {
  const { searchTerm, setSearchTerm, updateFilters } = tableState;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <SearchInput
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Filters could be rendered here */}
      {config.filters && config.filters.length > 0 && (
        <div className="flex items-center gap-2">
          {config.filters.map((filter) => (
            <FilterComponent
              key={filter.key}
              filter={filter}
              onChange={(value) =>
                updateFilters({ [filter.key]: value } as Partial<TFilters>)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Helper component to render individual filter controls
 */
function FilterComponent({
  filter,
  onChange,
}: {
  filter: FilterConfig;
  onChange: (value: any) => void;
}) {
  switch (filter.type) {
    case "select":
      return (
        <Select
          label={filter.label}
          variant="filtres"
          color="secondary"
          defaultValue="all"
          onChange={(value) => onChange(value === "all" ? undefined : value)}
        >
          <SelectItem value="all">Tous</SelectItem>
          {filter.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            onChange={(e) => onChange(e.target.checked ? true : undefined)}
          />
          {filter.label}
        </label>
      );

    case "date":
      return (
        <input
          type="date"
          className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      );

    case "text":
    default:
      return (
        <input
          type="text"
          placeholder={filter.label}
          className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      );
  }
}
