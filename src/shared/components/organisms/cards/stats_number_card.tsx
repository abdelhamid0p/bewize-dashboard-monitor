import { Card, CardContent } from "@/shared/components/atoms/card/Card";
import { cn } from "@/shared/lib/utils";
import ArrowDownRight from "@/assets/icones/arrow_down.svg";
import ArrowUpRight from "@/assets/icones/arrow_up.svg";
import { Icon, type IconName } from "../../atoms/icon";
import { Text } from "../../atoms/text/text";

interface StatsNumberCardProps {
  iconName: IconName;
  title: string;
  value: number;
  growth: string;
  trend: "up" | "down";
  iconBgClass: string;
  iconColorClass: string;
  valueColorClass: string;
  className?: string;
}

export const StatsNumberCard = ({
  iconName,
  title,
  value,
  growth,
  trend,
  iconBgClass,
  iconColorClass,
  valueColorClass,
  className,
}: StatsNumberCardProps) => {
  const isPositive = trend === "up";

  return (
    <Card
      className={cn(
        "p-0 w-full rounded-xl md:rounded-2xl border bg-white shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex flex-col justify-between p-3 md:p-4 lg:p-5 xl:p-6">
        <div className="flex items-center justify-between">
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
            {growth}
          </div>
        </div>

        <div className="mt-3 md:mt-4 lg:mt-5">
          <Text
            variant="display"
            className={cn(
              "text-lg md:text-xl lg:text-2xl xl:text-[28px] font-bold tracking-tight",
              valueColorClass,
            )}
          >
            {value.toLocaleString()}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
};
