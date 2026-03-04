import { DashboardNavbar } from "@/shared/components/molecules/nav-bar/dashboard_navbar";
import { useDashboard } from "../hooks/useStats";
import { useMetrics } from "../hooks/useMetrics";
import { StatsNumberCardContainer } from "../components/stats_number_card_container";
import { SubscriptionsChartContainer } from "../components/subscriptions_chart_container";
import { OrdersChartContainer } from "../components/orders_chart_container";
import { StudentsChartContainer } from "../components/students_chart_container";
import { GlobalChartContainer } from "../components/global_chart_container";

export const DashboardPage = () => {
  const dashboard = useDashboard();
  const { metrics, isLoading: metricsLoading } = useMetrics();

  return (
    <div className="p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-[#FAFAFF] min-h-full">
      {/* Dashboard Navbar */}
      <DashboardNavbar userName="Mohammed" />

      {/* Number Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
        {metricsLoading ? (
          <div className="col-span-full text-center py-4">Chargement...</div>
        ) : (
          metrics?.map((metric) => (
            <StatsNumberCardContainer key={metric.id} {...metric} />
          ))
        )}
      </div>

      {/* Charts Cards - Grid 2x2 responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
        {/* Students Chart - Real API */}
        <div className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
          <StudentsChartContainer />
        </div>

        {/* Orders Chart - Real API */}
        <div className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
          <OrdersChartContainer />
        </div>

        {/* Subscriptions Chart - Real API */}
        <div className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
          <SubscriptionsChartContainer />
        </div>

        {/* Global Chart - Real API (combines all 3) */}
        <div className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
          <GlobalChartContainer />
        </div>
      </div>
    </div>
  );
};
