import { Card, CardContent } from "@/shared/components/atoms/card/card"
import { cn } from "@/shared/lib/utils"
import ArrowDownRight from "@/assets/icones/arrow_down.svg"
import ArrowUpRight from "@/assets/icones/arrow_up.svg"
import { Icon, type IconName } from "../../atoms/icon"

interface StatsNumberCardProps {
  id: "students" | "orders" | "subscriptions"
  iconName: IconName
  title: string
  value: number
  growth: string
  trend: "up" | "down"
  className?: string
}

const idVariantMap = {
  students: "orange",
  orders: "blue",
  subscriptions: "green",
} as const

const variantStyles = {
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
}

export const StatsNumberCard = ({
  id,
  iconName,
  title,
  value,
  growth,
  trend,
  className,
}: StatsNumberCardProps) => {
  const isPositive = trend === "up"

  const variant = idVariantMap[id]
  const styles = variantStyles[variant]

  return (
    <Card
      className={cn(
        "p-0 w-full rounded-2xl border bg-white shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="flex flex-col justify-between p-5 sm:p-6">

        {/* Top Section */}
        <div className="flex items-center justify-between">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                styles.bg
              )}
            >
              <Icon
                name={iconName}
                className={styles.text}
              />
            </div>

            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>

          {/* Growth Badge */}
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

        {/* Value */}
        <div className="mt-5">
          <h2
            className={cn(
              "text-2xl sm:text-3xl lg:text-[28px] font-bold tracking-tight",
              styles.text
            )}
          >
            {value.toLocaleString()}
          </h2>
        </div>

      </CardContent>
    </Card>
  )
}
