import { Card, CardContent } from "@/shared/components/atoms/card/Card";
import { cn } from "@/shared/lib/utils";
import ArrowDownRight from "@/assets/icones/arrow_down.svg";
import ArrowUpRight from "@/assets/icones/arrow_up.svg";
import { Icon, type IconName } from "../../atoms/icon";
import { Text } from "../../atoms/text/text";
import { CardHeaderStats } from "../../atoms/card/Card_Header";

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
        <CardHeaderStats
          iconName={iconName}
          title={title}
          iconBgClass={iconBgClass}
          iconColorClass={iconColorClass}
          growth={growth}
          trend={trend}
        />
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
