import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card"
import { STATS_CONFIG, VARIANT_STYLES, type StatsId } from "../config/stats_config"
import { ICONS } from "@/shared/components/atoms/icon"

interface Props {
  id: StatsId | "global"
  datasets: number[][]
  labels: string[]
}

export const StatsChartCardContainer = ({
  id,
  datasets,
  labels,
}: Props) => {
  // Vue globale : 3 lignes
  if (id === "global") {
    return (
      <StatsChartCard
        title="Vue globale"
        iconName={ICONS.focus}
        iconBgClass="bg-purple-100"
        iconColorClass="text-primary-500"
        datasets={datasets}
        labels={labels}
        colors={["#FDB022", "#53B1FD", "#32D583"]}
        showLegend
        legendItems={[
          { label: "Étudiants", color: "#FDB022" },
          { label: "Commandes", color: "#53B1FD" },
          { label: "Abonnements", color: "#32D583" },
        ]}
      />
    )
  }

  // Vue individuelle : 1 ligne
  const config = STATS_CONFIG[id]
  const styles = VARIANT_STYLES[config.variant]

  return (
    <StatsChartCard
      title={config.title}
      iconName={config.iconName}
      iconBgClass={styles.bg}
      iconColorClass={styles.text}
      datasets={datasets}
      labels={labels}
      colors={[styles.hex]}
    />
  )
}