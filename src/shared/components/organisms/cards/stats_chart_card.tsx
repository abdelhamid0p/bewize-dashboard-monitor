import { Card } from "@/shared/components/atoms/card/Card";
import { Icon, type IconName } from "@/shared/components/atoms/icon";
import { Text } from "@/shared/components/atoms/text/text";
import { ChartLine } from "@/shared/components/atoms/chart/chart_line";
import { Select, SelectItem } from "@/shared/components/atoms/select";
import { cn } from "@/shared/lib/utils";

interface StatsChartCardProps {
  title: string;
  iconName: IconName;
  iconBgClass: string;
  iconColorClass: string;
  datasets: number[][];
  labels: string[];
  colors: string[];
  showLegend?: boolean;
  legendItems?: { label: string; color: string }[];
  className?: string;
}

export const StatsChartCard = ({
  title,
  iconName,
  iconBgClass,
  iconColorClass,
  datasets,
  labels,
  colors,
  showLegend = false,
  legendItems = [],
  className,
}: StatsChartCardProps) => {
  return (
    <Card className={cn("w-full h-full flex flex-col bg-white", className)}>
      {/* Header avec dropdowns */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          {/* Titre et icône */}
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full", iconBgClass)}>
              <Icon name={iconName} className={cn("h-5 w-5", iconColorClass)} />
            </div>

            <Text variant="body">{title}</Text>
          </div>

          {/* Dropdowns */}
          <div className="flex items-center gap-2">
            <Select label="Type d'abonnement" variant="statsFilter">
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </Select>
            <Select label="Type de plan" variant="statsFilter">
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </Select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 flex-1">
        <ChartLine
          datasets={datasets}
          labels={labels}
          colors={colors}
          height={200}
          legendItems={legendItems}
        />
      </div>

      {/* Legend */}
      {showLegend && legendItems.length > 0 && (
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center justify-center gap-6">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-sm text-gray-600">{item.label}</Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
