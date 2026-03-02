import { Eye } from "lucide-react";
import { ActionIconButton } from "@/shared/components/atoms/action-icon-button";

interface StudentActionsCellProps {
  studentId: string;
  onView?: (studentId: string) => void;
}

export const StudentActionsCell = ({
  studentId,
  onView,
}: StudentActionsCellProps) => {
  return (
    <ActionIconButton
      icon={<Eye className="size-6 2xl:size-7" />}
      ariaLabel="View student"
      className="text-action-eyes rounded-full"
      onClick={() => onView?.(studentId)}
    />
  );
};
