import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card";
import { STATS_CONFIG, VARIANT_STYLES } from "../config/stats_config";
import { useOrdersChart } from "../hooks/useOrdersChart";

/**
 * Container for the Orders Chart
 * Fetches data via useOrdersChart hook and renders StatsChartCard
 */
export const OrdersChartContainer = () => {
  const { chart, isLoading } = useOrdersChart();
  const config = STATS_CONFIG.orders;
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
      datasets={[chart.data]}
      labels={chart.labels}
      colors={[styles.hex]}
    />
  );
};
