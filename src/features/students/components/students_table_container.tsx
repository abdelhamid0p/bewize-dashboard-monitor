import { DataTable } from "@/components/atoms/data-table/data_table";
import { Badge } from "@/components/ui/badge";
import { useStudents } from "../hooks/useStudents";
import { TABLE_COLUMNS } from "../config/student_config";
import { StudentsActionsMenu } from "./students_actions_menu";

export const StudentsTableContainer = () => {
  const students = useStudents();

  const renderCell = (student: any, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-sm font-medium">
                {student.name[0]}
              </span>
            </div>
            <span>{student.name}</span>
          </div>
        );

      case "subscriptionType":
        return (
          <Badge
            variant={
              student.subscriptionBadgeColor === "green"
                ? "default"
                : student.subscriptionBadgeColor === "yellow"
                  ? "secondary"
                  : "outline"
            }
            className={
              student.subscriptionBadgeColor === "green"
                ? "bg-green-100 text-green-700"
                : student.subscriptionBadgeColor === "yellow"
                  ? "bg-yellow-100 text-yellow-700"
                  : student.subscriptionBadgeColor === "blue"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
            }
          >
            {student.subscriptionType}
          </Badge>
        );

      case "gender":
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
            <span className="text-red-600 text-lg">●</span>
          </span>
        );

      case "actions":
        return <StudentsActionsMenu studentId={student.id} />;

      default:
        return student[columnKey];
    }
  };

  if (students.loading) return <div>Chargement...</div>;
  if (students.error) return <div>Erreur: {students.error}</div>;

  return (
    <DataTable
      columns={TABLE_COLUMNS}
      data={students.data || []}
      renderCell={renderCell}
    />
  );
};
