import {
  Card,
  CardContent,
} from "@/shared/components/atoms/card/card"
import { Select, SelectItem } from "@/shared/components/atoms/select"
import { Icon, type IconName } from "@/shared/components/atoms/icon"
import { cn } from "@/shared/lib/utils"

interface StatsChartCardProps {
  id: "students_stats" | "orders_stats" | "subscriptions_stats" | "global_overview"
  title: string
  data: number[][]  // Array of datasets for multi-line charts
  labels?: string[]  // Week labels
  iconName: IconName
  className?: string
  showLegend?: boolean
  legendItems?: { label: string; color: string }[]
}

const idVariantMap = {
  students_stats: "orange",
  orders_stats: "blue",
  subscriptions_stats: "green",
  global_overview: "multi",
} as const

const variantStyles = {
  orange: {
    iconBg: "bg-orange-50",
    iconText: "text-orange-500",
    chartColor: "#F59E0B",
  },
  blue: {
    iconBg: "bg-blue-50",
    iconText: "text-blue-500",
    chartColor: "#3B82F6",
  },
  green: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-500",
    chartColor: "#10B981",
  },
  multi: {
    iconBg: "bg-purple-50",
    iconText: "text-purple-500",
    chartColors: ["#F59E0B", "#3B82F6", "#10B981"],
  },
}

// Function to create SVG path for smooth curve
const createSmoothPath = (points: { x: number; y: number }[]): string => {
  if (points.length < 2) return ""

  let path = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const controlX = (current.x + next.x) / 2

    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`
  }

  return path
}

export const StatsChartCard = ({
  id,
  title,
  data,
  labels = ["Week 1", "Week 2", "Week 3", "Week 4"],
  iconName,
  className,
  showLegend = false,
  legendItems = [],
}: StatsChartCardProps) => {
  const variant = idVariantMap[id]
  const styles = variantStyles[variant]

  // Chart dimensions
  const chartWidth = 100
  const chartHeight = 100
  const padding = 10

  // Normalize data to fit in chart
  const normalizeData = (dataset: number[]) => {
    const max = Math.max(...dataset)
    const min = Math.min(...dataset)
    const range = max - min || 1

    return dataset.map((value, index) => ({
      x: padding + (index * (chartWidth - 2 * padding)) / (dataset.length - 1),
      y: chartHeight - padding - ((value - min) / range) * (chartHeight - 2 * padding),
    }))
  }

  return (
    <Card
      className={cn(
        "w-full rounded-2xl border border-gray-100 bg-white shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                styles.iconBg
              )}
            >
              <Icon name={iconName} className={cn(styles.iconText, "h-5 w-5")} />
            </div>

            <h3 className="text-sm font-medium text-gray-700">
              {title}
            </h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select variant="compact" color="secondary" label="Type d'abonnement">
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </Select>

            <Select variant="compact" color="secondary" label="Type de plan">
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </Select>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full"
            style={{ height: "180px" }}
          >
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`grid-${i}`}
                x1={padding}
                y1={padding + (i * (chartHeight - 2 * padding)) / 4}
                x2={chartWidth - padding}
                y2={padding + (i * (chartHeight - 2 * padding)) / 4}
                stroke="#F3F4F6"
                strokeWidth="0.5"
              />
            ))}

            {/* Draw curves */}
            {data.map((dataset, datasetIndex) => {
              const points = normalizeData(dataset)
              const path = createSmoothPath(points)
              const color = variant === "multi" 
                ? (styles as any).chartColors[datasetIndex]
                : (styles as any).chartColor

              return (
                <g key={`dataset-${datasetIndex}`}>
                  {/* Line */}
                  <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Points */}
                  {points.map((point, pointIndex) => (
                    <circle
                      key={`point-${datasetIndex}-${pointIndex}`}
                      cx={point.x}
                      cy={point.y}
                      r="1.5"
                      fill={color}
                    />
                  ))}
                </g>
              )
            })}
          </svg>

          {/* X-axis labels */}
          <div className="mt-2 flex justify-between px-2">
            {labels.map((label, index) => (
              <span key={index} className="text-xs text-gray-400">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Legend (for multi-line charts) */}
        {showLegend && legendItems.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}