/**
 * DataTable - Pure UI Component
 * Renders a table with columns and data
 * NO LOGIC - only UI rendering
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/lib/utils";
import type { DataTableProps } from "./types";

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  renderCell,
  loading = false,
  emptyMessage = "Aucune donnée disponible",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-neutral-500">Chargement...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-neutral-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="border border-accent-100 bg-white rounded-t-2xl overflow-hidden">
      <div className="overflow-x-auto max-w-full">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-neutral-100">
              {columns.map((column, index) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "border-b border-accent-100 text-center text-black-100 text-sm p-6 whitespace-normal",
                    index === 0 && "rounded-tl-2xl",
                    index === columns.length - 1 && "rounded-tr-2xl",
                  )}
                  style={{
                    width: column.width || "auto",
                    minWidth: column.width || "100px",
                  }}
                >
                  <div className="flex items-center justify-center gap-1 flex-wrap">
                    {column.label}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="border border-neutral-200">
            {data.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-black-200 hover:bg-neutral-100 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="text-center text-black-100 text-sm p-4 md:p-6 whitespace-normal"
                    style={{
                      width: column.width || "auto",
                      minWidth: column.width || "100px",
                    }}
                  >
                    <div className="flex items-center justify-center w-full">
                      {renderCell
                        ? renderCell(item, column.key)
                        : ((item[column.key as keyof T] as React.ReactNode) ??
                          "—")}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
