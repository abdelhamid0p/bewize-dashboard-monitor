import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/atoms/card/card"
import { Select, SelectItem } from "@/shared/components/atoms/select"

interface StatsChartCardProps {
  title: string
  data: number[]
}

export const StatsChartCard = ({
  title,
  data,
}: StatsChartCardProps) => {
  return (
    <Card className="w-full">
      
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          {title}
        </CardTitle>

        <div className="flex gap-2">
          <Select label="Type abonnement" variant="compact" color="secondary">
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </Select>

          <Select label="Type plan" variant="compact" color="secondary">
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* Fake chart */}
        <div className="flex items-end gap-2 h-40">
          {data.map((value, index) => (
            <div
              key={index}
              className="bg-primary-500 rounded-md w-full"
              style={{ height: `${value * 2}px` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
