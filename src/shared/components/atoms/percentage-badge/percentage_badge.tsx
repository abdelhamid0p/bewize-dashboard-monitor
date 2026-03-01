import { cn } from "@/lib/utils";

interface PercentageBadgeProps {
  percentage: string | number;
  className?: string;
}

/**
 * PercentageBadge - Reusable atomic component for displaying percentages
 * Used in Promo Codes feature
 */
export const PercentageBadge = ({
  percentage,
  className,
}: PercentageBadgeProps) => {
  const displayValue =
    typeof percentage === "number" ? `${percentage}%` : percentage;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap",
        "bg-[#FFE0FC] text-[#8B76FF]",
        className,
      )}
    >
      {displayValue}
    </span>
  );
};
