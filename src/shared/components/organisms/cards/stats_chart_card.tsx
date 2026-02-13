import {
  Card,
  CardContent,
} from "@/shared/components/atoms/card/card"
import { Select, SelectItem } from "@/shared/components/atoms/select"
import { Icon, type IconName } from "@/shared/components/atoms/icon"
import { cn } from "@/shared/lib/utils"
import { Text } from "../../atoms/text/text"

/* ============================= */
/* Types */
/* ============================= */

interface StatsChartCardProps {
  id: "students_stats" | "orders_stats" | "subscriptions_stats" | "global_overview"
  title: string
  data?: number[][]
  labels?: string[]
  iconName: IconName
  className?: string
  showLegend?: boolean
  legendItems?: { label: string; color: string }[]
}

/* ============================= */
/* Variant Configuration */
/* ============================= */

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

/* ============================= */
/* Helper Functions */
/* ============================= */

// Smooth curve generator using Bézier curves
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

/* ============================= */
/* StatsChartCard Component */
/* ============================= */

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

  // ===== Default Weekly Data =====
  const defaultData: Record<string, number[][]> = {
    students_stats: [[120, 180, 150, 210]],
    orders_stats: [[80, 130, 95, 160]],
    subscriptions_stats: [[40, 60, 75, 90]],
    global_overview: [
      [120, 180, 150, 210],
      [80, 130, 95, 160],
      [40, 60, 75, 90],
    ],
  }

  const chartData = data ?? defaultData[id]

  // ===== Chart Configuration =====
  const chartWidth = 100
  const chartHeight = 100
  const paddingY = 10
  const paddingX = 5 // Padding horizontal pour aligner avec les labels

  // Calculer la largeur utilisable (en tenant compte du padding)
  const usableWidth = chartWidth - 2 * paddingX
  
  // Nombre de points de données
  const dataPointsCount = chartData[0]?.length || labels.length

  /* ============================= */
  /* Normalize Data - ALIGNÉ AVEC LES LABELS */
  /* ============================= */
  const normalizeData = (dataset: number[]) => {
    const max = Math.max(...dataset)
    const min = Math.min(...dataset)
    const range = max - min || 1

    return dataset.map((value, index) => {
      // IMPORTANT: Calculer X pour qu'il soit aligné avec les labels
      // Si on a 4 points, ils seront à 0%, 33%, 66%, 100% de la largeur utilisable
      const x = paddingX + (index * usableWidth) / (dataset.length - 1)
      
      // Calculer Y normalisé (inversion car SVG a Y=0 en haut)
      const y =
        chartHeight -
        paddingY -
        ((value - min) / range) * (chartHeight - 2 * paddingY)

      return { x, y }
    })
  }

  return (
    <Card
      className={cn(
        "w-full rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-4 sm:p-6">
        
        {/* ===== Header ===== */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Title & Icon */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                styles.iconBg
              )}
            >
              <Icon 
                name={iconName} 
                className={cn(styles.iconText, "h-5 w-5")} 
              />
            </div>

        
            <Text variant="body"> 
              {title}
             </Text> 
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select 
              variant="compact" 
              color="secondary" 
              label="Type d'abonnement"
            >
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </Select>

            <Select 
              variant="compact" 
              color="secondary" 
              label="Type de plan"
            >
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </Select>
          </div>
        </div>

        {/* ===== Chart ===== */}
        <div className="mt-6">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full"
            style={{ height: "180px" }}
            preserveAspectRatio="none"
          >
            {/* Grid lines (horizontal) */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`grid-${i}`}
                x1={paddingX}
                y1={paddingY + (i * (chartHeight - 2 * paddingY)) / 4}
                x2={chartWidth - paddingX}
                y2={paddingY + (i * (chartHeight - 2 * paddingY)) / 4}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))}

            {/* Vertical guide lines pour aligner avec labels */}
            {labels.map((_, index) => {
              const x = paddingX + (index * usableWidth) / (labels.length - 1)
              return (
                <line
                  key={`vgrid-${index}`}
                  x1={x}
                  y1={paddingY}
                  x2={x}
                  y2={chartHeight - paddingY}
                  stroke="#F3F4F6"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                />
              )
            })}

            {/* Draw datasets */}
            {chartData.map((dataset, datasetIndex) => {
              const points = normalizeData(dataset)
              const path = createSmoothPath(points)
              const color =
                variant === "multi"
                  ? (styles as any).chartColors[datasetIndex]
                  : (styles as any).chartColor

              return (
                <g key={`dataset-${datasetIndex}`}>
                  {/* Curve line */}
                  <path
                    d={path}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {points.map((point, pointIndex) => (
                    <circle
                      key={`point-${datasetIndex}-${pointIndex}`}
                      cx={point.x}
                      cy={point.y}
                      r="2"
                      fill={color}
                      className="transition-all duration-200 hover:r-3"
                    />
                  ))}
                </g>
              )
            })}
          </svg>

          {/* ===== X-axis labels - ALIGNÉS AVEC LES POINTS ===== */}
          <div className="mt-3 flex justify-between" style={{ paddingLeft: `${paddingX}%`, paddingRight: `${paddingX}%` }}>
            {labels.map((label, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center"
                style={{
                  // Centrer chaque label exactement sous son point
                  position: 'relative',
                  left: index === 0 ? '0' : index === labels.length - 1 ? '0' : '0',
                }}
              >
                <span className="text-xs font-normal text-neutral-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Legend ===== */}
        {showLegend && legendItems.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {legendItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-normal text-neutral-600">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}