import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/shared/lib/utils";

interface SortCriterion {
  field: string;
  direction: "asc" | "desc";
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  renderCell?: (item: any, columnKey: string) => React.ReactNode;
  sort?: SortCriterion[];
  onSort?: (field: string) => void;
}

export const DataTable = ({
  columns,
  data,
  renderCell,
  sort = [],
  onSort,
}: DataTableProps) => {
  const getSortIcon = (columnKey: string) => {
    const criterion = sort.find((s) => s.field === columnKey);
    if (!criterion) return null;
    return criterion.direction === "asc" ? (
      <ChevronUp className="size-4 inline ml-1" />
    ) : (
      <ChevronDown className="size-4 inline ml-1" />
    );
  };

  return (
    <div className="border border-accent-100 bg-white overflow-hidden rounded-t-2xl">
      <Table>
        <TableHeader>
          <TableRow className=" bg-neutral-100">
            {columns.map((column, index) => (
              <TableHead
                key={column.key}
                className={cn(
                  "border-b border-accent-100 text-center text-black-100 text-sm p-6",
                  column.sortable && "cursor-pointer hover:bg-neutral-200",
                  index === 0 && "rounded-tl-2xl",
                  index === columns.length - 1 && "rounded-tr-2xl",
                )}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center justify-center">
                  {column.label}
                  {getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody className="border border-neutral-200">
          {data.map((item, index) => (
            <TableRow
              key={item.id || index}
              className={cn(
                "border-b border-black-200 hover:bg-neutral-100 transition-colors",
              )}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="text-center text-black-100 text-sm p-4 md:p-6"
                >
                  <div className="flex items-center justify-center w-full">
                    {renderCell
                      ? renderCell(item, column.key)
                      : item[column.key]}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
