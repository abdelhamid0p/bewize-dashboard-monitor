import { DataTable } from "@/components/atoms/data-table/data_table";
import { useStudents } from "../hooks/useStudents";
import { TABLE_COLUMNS } from "../config/student_config";
import { StudentsActionsMenu } from "./students_actions_menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";
import UserIcon from "@/../assets/students_icone_table.svg";

const PlanBadge = ({ plan }: { plan: string }) => {
  const styles: Record<string, string> = {
    Annuel: "bg-green-200 text-green-100",
    Mensuel: "bg-orange-200 text-orange-100",
    Trimestriel: "bg-red-200 text-red-100",
    Semestriel: "bg-blue-200 text-blue-300",
  };
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        styles[plan] || "bg-neutral-100 text-neutral-600",
      )}
    >
      {plan}
    </span>
  );
};

export const StudentsTableContainer = () => {
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
  } = useStudents();

  const renderCell = (student: any, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <img src={UserIcon} className="w-5 h-5 " />
            <span className="text-sm font-medium text-neutral-800">
              {student.name}
            </span>
          </div>
        );

      case "planType":
        return <PlanBadge plan={student.planType} />;

      case "subscriptionType":
        return (
          <span className="text-sm font-medium text-neutral-800">
            {student.subscriptionType}
          </span>
        );

      case "gender":
        return (
          <span className="flex items-center gap-1.5 text-sm text-neutral-700">
            <span
              className={cn(
                "w-2 h-2 rounded-full inline-block",
                student.gender === "Fille" ? "bg-red-500" : "bg-blue-500",
              )}
            />
            {student.gender}
          </span>
        );

      case "actions":
        return <StudentsActionsMenu studentId={student.id} />;

      default:
        return (
          <span className="text-sm font-medium text-neutral-800">
            {student[columnKey]}
          </span>
        );
    }
  };

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
        data={data || []}
        renderCell={renderCell}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-sm text-neutral-500">Page</span>
        <span className="text-sm text-neutral-400">-</span>

        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          ←
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="rounded-full w-7 h-7 p-0 text-xs"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          →
        </Button>

        <span className="text-sm text-neutral-400">-</span>
        <span className="text-sm text-neutral-500">{totalItems}</span>
      </div>
    </div>
  );
};
