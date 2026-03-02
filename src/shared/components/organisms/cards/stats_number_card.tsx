import { Card, CardContent } from "@/shared/components/atoms/card/card"
import { cn } from "@/shared/lib/utils"

interface StatsNumberCardProps {
  title: string
  value: number
  growth: string
  trend: "up" | "down"
}

export const StatsNumberCard = ({
  title,
  value,
  growth,
  trend,
}: StatsNumberCardProps) => {
  return (
    <Card className="w-full bg-neutral-100 p-3">
      <CardContent className="flex flex-col gap-4 p-4">
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{title}</span>

          <span
            className={cn(
              "text-xs font-medium rounded-full",
              trend === "up"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {growth}
          </span>
        </div>

        <div className="text-3xl font-bold text-gray-900">
          {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
