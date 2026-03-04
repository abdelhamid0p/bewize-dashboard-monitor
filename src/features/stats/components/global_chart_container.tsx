import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card";
import { GLOBAL_CHART_CONFIG, VARIANT_STYLES } from "../config/stats_config";
import { useGlobalChart } from "../hooks/useGlobalChart";

/**
 * Container for the Global Chart
 * Combines students, orders, and subscriptions data in a single chart
 */
export const GlobalChartContainer = () => {
  const { chart, isLoading } = useGlobalChart();
  const config = GLOBAL_CHART_CONFIG;
  const styles = VARIANT_STYLES[config.variant];

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-lg">
        Chargement...
      </div>
    );
  }

  if (!chart) {
    return null;
  }

  return (
    <StatsChartCard
      title={config.title}
      iconName={config.iconName}
      iconBgClass={styles.bg}
      iconColorClass={styles.text}
      datasets={chart.datasets}
      labels={chart.labels}
      colors={config.colors as unknown as string[]}
      showLegend
      legendItems={
        config.legendItems as unknown as { label: string; color: string }[]
      }
    />
  );
};
