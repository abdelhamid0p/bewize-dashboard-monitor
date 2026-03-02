"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart"

interface ChartLineProps {
  datasets: number[][]
  labels: string[]
  colors: string[]
  height?: number
  legendItems?: { label: string; color: string }[]
}

export const ChartLine = ({
  datasets,
  labels,
  colors,
  height = 200,
  legendItems = [],
}: ChartLineProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Transformer les données
  const chartData = labels.map((label, index) => {
    const point: any = { name: label }
    datasets.forEach((dataset, i) => {
      point[`value${i}`] = dataset[index]
    })
    return point
  })

  // Trouver l'index du max pour chaque dataset
  const maxIndexes = datasets.map((dataset) => {
    const max = Math.max(...dataset)
    return dataset.indexOf(max)
  })

  // Configuration des couleurs pour shadcn
  const chartConfig: ChartConfig = datasets.reduce((acc, _, i) => {
    acc[`value${i}`] = {
      label: legendItems[i]?.label || `Series ${i + 1}`,
      color: colors[i] || "#000",
    }
    return acc
  }, {} as ChartConfig)

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        onMouseMove={(state: any) => {
          if (state.isTooltipActive && state.activeTooltipIndex !== undefined) {
            setActiveIndex(state.activeTooltipIndex)
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {/* Grille horizontale uniquement */}
        <CartesianGrid
          strokeDasharray="0"
          stroke="#E2E8F0"
          vertical={false}
          horizontal={true}
        />

        {/* Axe X - Tous les labels visibles */}
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
          interval={0}
        />

        {/* Axe Y - Visible avec valeurs */}
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#94A3B8", fontSize: 12 }}
          tickMargin={8}
          width={40}
        />

        {/* Tooltip */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        {/* Les courbes */}
        {datasets.map((dataset, i) => (
          <Area
            key={i}
            type="monotone"
            dataKey={`value${i}`}
            stroke={colors[i]}
            strokeWidth={3}
            fill="transparent"
            dot={(props: any) => {
              // Point uniquement sur le max
              if (props.index === maxIndexes[i]) {
                return (
                  <g key={`max-${i}-${props.index}`}>
                    {/* Trait vertical depuis le point max */}
                    <line
                      x1={props.cx}
                      y1={props.cy}
                      x2={props.cx}
                      y2={height - 30}
                      stroke="#E2E8F0"
                      strokeWidth={2}
                    />
                    {/* Point */}
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={6}
                      fill={colors[i]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  </g>
                )
              }
              return <g/>
            }}
            activeDot={false}
          />
        ))}

        {/* Ligne verticale au survol */}
        {activeIndex !== null && (
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={height}
            stroke="#E2E8F0"
            strokeWidth={2}
            style={{
              transform: `translateX(${
                (activeIndex / (chartData.length - 1)) * 100
              }%)`,
            }}
          />
        )}
      </AreaChart>
    </ChartContainer>
  )
}