import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentsActionsMenuProps {
  studentId: string;
}

export const StudentsActionsMenu = ({
  studentId,
}: StudentsActionsMenuProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-blue-100 rounded-full "
      onClick={() => console.log("Voir", studentId)}
    >
      <Eye className="size-6 2xl:size-7" />
    </Button>
  );
};
