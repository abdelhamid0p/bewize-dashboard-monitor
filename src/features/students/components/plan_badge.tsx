import { cn } from "@/shared/lib/utils";

interface PlanBadgeProps {
  plan?: string;
}

export const PlanBadge = ({ plan }: PlanBadgeProps) => {
  const label = plan && plan.trim() !== "" ? plan : "N/A";
  const styles: Record<string, string> = {
    ANNUEL: "bg-green-200 text-green-100",
    MENSUEL: "bg-orange-200 text-orange-100",
    TRIMESTRIEL: "bg-red-200 text-red-100",
    SEMESTRIEL: "bg-blue-200 text-blue-300",
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
