import { cn } from "@/shared/lib/utils";

interface PlanBadgeProps {
  plan?: string;
}

/**
 * PlanBadge - Reusable atomic component for displaying plan types
 * Used across Students and Subscriptions features
 */
export const PlanBadge = ({ plan }: PlanBadgeProps) => {
  const label = plan && plan.trim() !== "" ? plan : "N/A";
  const styles: Record<string, string> = {
    YEAR: "bg-green-200 text-green-card",
    SEMESTRE: "bg-orange-200 text-orange-card",
    SCHOOL: "bg-red-200 text-red-card",
    TRIMESTRE: "bg-blue-200 text-blue-card",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        styles[label] || "bg-neutral-100 text-neutral-600",
      )}
    >
      {label}
    </span>
  );
};
