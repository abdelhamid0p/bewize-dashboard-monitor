import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card";
import { STATS_CONFIG, VARIANT_STYLES } from "../config/stats_config";
import { useStudentsChart } from "../hooks/useStudentsChart";

/**
 * Container for the Students Chart
 * Fetches data via useStudentsChart hook and renders StatsChartCard
 */
export const StudentsChartContainer = () => {
  const { chart, isLoading } = useStudentsChart();
  const config = STATS_CONFIG.students;
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
