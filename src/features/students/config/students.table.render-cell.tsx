import {
  StudentActionsCell,
  StudentGenderCell,
  StudentNameCell,
} from "../components";
import type { StudentUI } from "../model";

export const renderStudentCell = (student: StudentUI, columnKey: string) => {
  switch (columnKey) {
    case "name":
      return <StudentNameCell name={student.name} />;

    case "gender":
      return <StudentGenderCell genderLabel={student.gender} />;

    case "actions":
      return (
        <StudentActionsCell
          studentId={student.id}
          onView={(studentId) => console.log("Voir", studentId)}
        />
      );

    default:
      return (
        <span className="text-sm text-neutral-700">
          {student[columnKey as keyof StudentUI]}
        </span>
      );
  }
};
