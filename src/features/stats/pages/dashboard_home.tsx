import { DashboardNavbar } from "@/shared/components/molecules/nav-bar/dashboard_navbar";
import { useDashboard } from "../hooks/useStats";
import { StatsNumberCardContainer } from "../components/stats_number_card_container";
import { StatsChartCardContainer } from "../components/stats_chart_card_container";

export const DashboardPage = () => {
  const dashboard = useDashboard();

  return (
    <div className="p-6">
      {/* Dashboard Navbar */}
      <DashboardNavbar userName="Mohammed" />

      {/* Number Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {dashboard.data?.stats.map((stat) => (
          <StatsNumberCardContainer key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts Cards - Grid 2x2 responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {dashboard.data?.charts.map((chart) => (
          <div key={chart.id} className="min-h-[400px]">
            <StatsChartCardContainer {...chart} />
          </div>
        ))}
      </div>
    </div>
  );
};
