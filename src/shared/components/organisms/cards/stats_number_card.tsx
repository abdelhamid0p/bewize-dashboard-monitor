import { Card, CardContent } from "@/shared/components/atoms/card/card"
import { cn } from "@/shared/lib/utils"
import ArrowDownRight from "@/assets/icones/arrow_down.svg"
import ArrowUpRight from "@/assets/icones/arrow_up.svg"
import { Icon, type IconName } from "../../atoms/icon"
import { Text } from "../../atoms/text/text"

interface StatsNumberCardProps {
  iconName: IconName
  title: string
  value: number
  growth: string
  trend: "up" | "down"
  iconBgClass: string
  iconColorClass: string
  valueColorClass: string
  className?: string
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
  const isPositive = trend === "up"

  return (
    <Card
      className={cn(
        "p-0 w-full rounded-2xl border bg-white shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="flex flex-col justify-between p-5 sm:p-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                iconBgClass
              )}
            >
              <Icon name={iconName} className={iconColorClass} />
            </div>

            <Text variant="body">{title}</Text>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            <img
              src={isPositive ? ArrowUpRight : ArrowDownRight}
              className="h-4 w-4"
            />
            {growth}
          </div>
        </div>

        <div className="mt-5">
          <Text
            variant="display"
            className={cn(
              "text-2xl sm:text-3xl lg:text-[28px] font-bold tracking-tight",
              valueColorClass
            )}
          >
            {value.toLocaleString()}
          </Text>
        </div>

      </CardContent>
    </Card>
  )
}
