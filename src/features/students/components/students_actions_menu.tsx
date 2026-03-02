import { StudentActionsCell } from "./student_actions_cell";

interface StudentsActionsMenuProps {
  studentId: string;
}

export const StudentsActionsMenu = ({
  studentId,
}: StudentsActionsMenuProps) => {
  return (
    <StudentActionsCell
      studentId={studentId}
      onView={(selectedId) => console.log("Voir", selectedId)}
    />
  );
};
