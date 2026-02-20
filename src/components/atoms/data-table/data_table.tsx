import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/shared/lib/utils";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  renderCell?: (item: any, columnKey: string) => React.ReactNode;
}

export const DataTable = ({ columns, data, renderCell }: DataTableProps) => {
  return (
    <div className=" bg-white overflow-hidden rounded-t-2xl">
      <Table>
        <TableHeader>
          <TableRow className="border border-accent-100 bg-neutral-100 ">
            {columns.map((column, index) => (
              <TableHead
                key={column.key}
                className={cn(
                  "text-center text-black-100 text-sm p-6",
                  index === 0 && "rounded-tl-2xl",
                  index === columns.length - 1 && "rounded-tr-2xl",
                )}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody className=" border border-neutral-200">
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
                  className="text-center text-black-100 text-sm p-6"
                >
                  {renderCell ? renderCell(item, column.key) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
