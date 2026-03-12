import { useDashboard } from "../hooks/useStats";
import { StatsNumberCardContainer } from "../components/stats_number_card_container";
import { StatsChartCardContainer } from "../components/stats_chart_card_container";

export const DashboardPage = () => {
  const dashboard = useDashboard();

  return (
    <div className="p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-[#FAFAFF] min-h-full">
      {/* Number Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
        {dashboard.data?.stats.map((stat) => (
          <StatsNumberCardContainer key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts Cards - Grid 2x2 responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
        {dashboard.data?.charts.map((chart) => (
          <div
            key={chart.id}
            className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]"
          >
            <StatsChartCardContainer {...chart} />
          </div>
        ))}
      </div>
    </div>
  );
};
