import { statsCharts } from "@/features/stats/data/stats_data"
import { DashboardNavbar } from "@/shared/components/molecules/nav-bar/dashboard_navbar"
import { StatsChartCard } from "@/shared/components/organisms/cards/stats_chart_card"
import { useStats } from "../hooks/useStats"
import { StatsNumberCardContainer } from "../components/stats_number_card_container"

export const DashboardPage = () => {

    const stats = useStats();

  return (
    <div className="p-2">
      {/* Dashboard Navbar */}
      <DashboardNavbar userName="Mohamed" />

      {/* Number Cards */}
<div className="flex flex-wrap gap-6">
  {stats.data ? (
    stats.data.map((stat) => (
      <div
        key={stat.id}
        className="flex-1  "
      >
        <StatsNumberCardContainer
          {...stat}
          />
      
      </div>
    ))
  ) : (
    <p>Loading stats...</p>
  )}
</div>

      {/* Charts Cards - 2x2 Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {statsCharts.map((chart) => (
          <StatsChartCard
            key={chart.id}
            id={chart.id}
            title={chart.title}
            data={chart.data}
            labels={chart.labels}
            iconName={chart.iconName}
            showLegend={chart.showLegend}
            legendItems={chart.legendItems || []}
          />
        ))}
      </div>
    </div>
  )
}
