import { cn } from "@/lib/utils";

type DotColor = "red" | "blue" | "green" | "orange";
type TextColor = "neutral" | "red" | "blue" | "green" | "orange";

interface StatusIndicatorProps {
  label: string;
  dotColor: DotColor;
  textColor?: TextColor;
  className?: string;
}

const dotColorStyles: Record<DotColor, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
};

const textColorStyles: Record<TextColor, string> = {
  neutral: "text-neutral-700",
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  orange: "text-orange-500",
};

/**
 * StatusIndicator - Reusable atomic component for displaying status with dot indicator
 * Used across Students (gender), Subscriptions (status), and Promo Codes (status)
 */
export const StatusIndicator = ({
  label,
  dotColor,
  textColor = "neutral",
  className,
}: StatusIndicatorProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 text-sm font-medium",
        textColorStyles[textColor],
        className,
      )}
    >
      <span
        className={cn(
          "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0",
          dotColorStyles[dotColor],
        )}
      />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
};
