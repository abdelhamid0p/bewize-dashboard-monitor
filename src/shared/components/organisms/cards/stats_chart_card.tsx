import { Card } from "@/shared/components/atoms/card/Card";
import { Icon, type IconName } from "@/shared/components/atoms/icon";
import { Text } from "@/shared/components/atoms/text/text";
import { ChartLine } from "@/shared/components/atoms/chart/chart_line";
import { Select, SelectItem } from "@/shared/components/atoms/select";
import { cn } from "@/shared/lib/utils";
import { CardContent } from "../../ui/card";

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
      <div className="p-3 md:p-4 lg:p-5 xl:p-6 pb-0">
        <div className="flex items-center justify-between">
          {/* Titre et icône */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className={cn("p-1.5 md:p-2 rounded-full", iconBgClass)}>
              <Icon
                name={iconName}
                className={cn("h-4 w-4 md:h-5 md:w-5", iconColorClass)}
              />
            </div>

            <Text variant="body" className="text-[10px] md:text-xs lg:text-sm">
              {title}
            </Text>
          </div>

          {/* Dropdowns */}
          <div className="flex items-center gap-1 md:gap-2">
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
      <div className="px-3 md:px-4 lg:px-5 xl:px-6 flex-1">
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
        <div className="px-3 md:px-4 lg:px-5 xl:px-6 pb-3 md:pb-4 lg:pb-5 xl:pb-6 pt-1 md:pt-2">
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-1 md:gap-2">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-[10px] md:text-xs lg:text-sm text-gray-600">
                  {item.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
