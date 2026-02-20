import { DataTable } from "@/components/atoms/data-table/data_table";
import { useStudents } from "../hooks/useStudents";
import { TABLE_COLUMNS, renderStudentCell } from "../config/student_config";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

export const StudentsTableContainer = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    goToPage,
  } = useStudents();

  if (loading)
    return (
      <div className="p-6 text-center text-neutral-500">Chargement...</div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Erreur: {error.message}
      </div>
    );

  return (
    <div className="space-y-4">
      <DataTable
        columns={TABLE_COLUMNS}
        data={data}
        renderCell={renderStudentCell}
      />

      {/* Pagination serveur */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-sm text-neutral-500">Page</span>
        <span className="text-sm text-neutral-400">-</span>

        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={currentPage === 0}
          onClick={() => goToPage(currentPage - 1)}
        >
          ←
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = currentPage < 3 ? i : currentPage - 2 + i;
          if (page >= totalPages) return null;
          return (
            <Button
              key={page}
              size="sm"
              onClick={() => goToPage(page)}
              className={cn(
                "rounded-full w-7 h-7 p-0 text-xs",
                currentPage === page
                  ? "bg-primary-500 hover:bg-primary-600 text-white"
                  : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50",
              )}
            >
              {page + 1}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={currentPage === totalPages - 1}
          onClick={() => goToPage(currentPage + 1)}
        >
          →
        </Button>

        <span className="text-sm text-neutral-400">-</span>
        <span className="text-sm text-neutral-500">{totalElements}</span>
      </div>
    </div>
  );
};
