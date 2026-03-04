import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card";
import { STATS_CONFIG, VARIANT_STYLES } from "../config/stats_config";
import { useSubscriptionsChart } from "../hooks/useSubscriptionsChart";

/**
 * Container for the Subscriptions Chart
 * Fetches data via useSubscriptionsChart hook and renders StatsChartCard
 */
export const SubscriptionsChartContainer = () => {
  const { chart, isLoading } = useSubscriptionsChart();
  const config = STATS_CONFIG.subscriptions;
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
