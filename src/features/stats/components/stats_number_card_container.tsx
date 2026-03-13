import { StatsNumberCard } from "@/shared/components/organisms/cards/stats_number_card";
import {
  STATS_CONFIG,
  VARIANT_STYLES,
  type StatsId,
} from "../config/stats_config";

interface StatsNumberCardContainerProps {
  id: StatsId;
  value: number;
  growth: string;
  trend: "up" | "down";
}

export const StatsNumberCardContainer = ({
  id,
  value,
  growth,
  trend,
}: StatsNumberCardContainerProps) => {
  const config = STATS_CONFIG[id];
  const styles = VARIANT_STYLES[config.variant];

  return (
    <StatsNumberCard
      iconName={config.iconName}
      title={config.title}
      value={value}
      growth={growth}
      trend={trend}
      iconBgClass={styles.bg}
      iconColorClass={styles.text}
      valueColorClass={styles.text}
    />
  );
};
