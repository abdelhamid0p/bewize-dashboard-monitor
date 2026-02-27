import { StudentsActionsMenu } from "../components";
import { PlanBadge } from "@/components/atoms/plan-badge";
import { SubscriptionTypeBadge } from "@/components/atoms/subscription-type-badge";
import { StatusIndicator } from "@/components/atoms/status-indicator";
import type { StudentRow } from "../types";

const UserIcon = "/assets/icons/students_icone_table.svg";

export const renderStudentCell = (student: StudentRow, columnKey: string) => {
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
      return <SubscriptionTypeBadge type={student.subscriptionType} />;

    case "gender":
      return (
        <StatusIndicator
          label={student.gender}
          dotColor={student.gender === "Fille" ? "red" : "blue"}
          textColor="neutral"
        />
      );

    case "actions":
      return <StudentsActionsMenu studentId={student.id} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {student[columnKey as keyof StudentRow]}
        </span>
      );
  }
};
