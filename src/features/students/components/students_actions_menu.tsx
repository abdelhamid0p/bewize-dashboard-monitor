import { StudentActionsCell } from "./student_actions_cell";
import { useNavigate } from "react-router-dom";

interface StudentsActionsMenuProps {
  studentId: string;
}

export const StudentsActionsMenu = ({
  studentId,
}: StudentsActionsMenuProps) => {
  const navigate = useNavigate();
  return (
    <StudentActionsCell
      studentId={studentId}
      onView={(selectedId) => navigate(`/dashboard/students/${selectedId}`)}
    />
  );
};
