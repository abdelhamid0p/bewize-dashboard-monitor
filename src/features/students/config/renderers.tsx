/**
 * Student cell renderers - custom rendering for specific columns
 * Pure UI - no logic
 */

import type { ReactNode } from "react";
import { PlanBadge } from "@/shared/components/atoms/plan-badge";
import { SubscriptionTypeBadge } from "@/shared/components/atoms/subscription-type-badge";
import { StatusIndicator } from "@/shared/components/atoms/status-indicator";
import { StudentsActionsMenu } from "../components/students_actions_menu";
import type { StudentUI } from "../model/student.types";
import { GENDER_LABEL_COLORS } from "./enums";

const UserIcon = "/assets/icons/students_icone_table.svg";

/**
 * Render a cell based on column key
 */
export const renderStudentCell = (
  student: StudentUI,
  columnKey: string,
): ReactNode => {
  switch (columnKey) {
    case "name": {
      return (
        <div className="flex items-center gap-2">
          <img src={UserIcon} alt="" className="w-5 h-5" />
          <span className="text-sm font-medium text-neutral-800">
            {student.name || "—"}
          </span>
        </div>
      );
    }

    case "planType":
      return student.planType ? (
        <PlanBadge plan={student.planType} />
      ) : (
        <span className="text-sm font-medium text-neutral-800">—</span>
      );

    case "subscriptionType":
      return student.subscriptionType ? (
        <SubscriptionTypeBadge type={student.subscriptionType} />
      ) : (
        <span className="text-sm font-medium text-neutral-800">—</span>
      );

    case "gender":
      return student.gender ? (
        <StatusIndicator
          label={student.gender}
          dotColor={GENDER_LABEL_COLORS[student.gender] || "blue"}
          textColor="neutral"
        />
      ) : (
        <span className="text-sm font-medium text-neutral-800">—</span>
      );

    case "actions":
      return <StudentsActionsMenu studentId={student.id} />;

    default:
      return (
        <span className="text-sm font-medium text-neutral-800">
          {student[columnKey as keyof StudentUI] || "—"}
        </span>
      );
  }
};
