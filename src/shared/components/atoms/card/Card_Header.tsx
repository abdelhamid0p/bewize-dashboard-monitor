import { Icon, type IconName } from "../icon";
import { Text } from "../text/text";
import ArrowDownRight from "@/assets/icones/arrow_down.svg";
import ArrowUpRight from "@/assets/icones/arrow_up.svg";
import { cn } from "@/shared/lib/utils";

interface CardHeaderStatsProps {
  iconName: IconName;
  title: string;
  iconBgClass: string;
  iconColorClass: string;
  growth?: string;
  trend?: "up" | "down";
  className?: string;
}

export const CardHeaderStats = ({
  iconName,
  title,
  iconBgClass,
  iconColorClass,
  growth,
  trend,
  className,
}: CardHeaderStatsProps) => {
  const isPositive = trend === "up";
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2 md:gap-3">
        <div
          className={cn(
            "flex h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full",
            iconBgClass,
          )}
        >
          <Icon
            name={iconName}
            className={cn(iconColorClass, "w-4 h-4 md:w-5 md:h-5")}
          />
        </div>
        <Text variant="body" className="text-[10px] md:text-xs lg:text-sm">
          {title}
        </Text>
      </div>
      {growth && trend && (
        <div
          className={cn(
            "flex items-center gap-0.5 md:gap-1 rounded-full px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium",
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600",
          )}
        >
          <img
            src={isPositive ? ArrowUpRight : ArrowDownRight}
            className="h-3 w-3 md:h-4 md:w-4"
          />
          {(() => {
            // Supprime % et espaces, garde le signe
            const match = growth.match(/([+-]?\d+(?:\.\d+)?)/);
            const num = match ? Number(match[1]) : 0;
            return (
              num.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) + "%"
            );
          })()}
        </div>
      )}
    </div>
  );
};
