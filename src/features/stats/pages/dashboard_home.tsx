import { useEffect, useCallback } from "react";
import { useExportContext } from "@/shared/context/ExportContext";
import { exportToExcel } from "@/shared/utils/exportToExcel";
import type { ExportSheet } from "@/shared/utils/exportToExcel";
import { useDashboard } from "../hooks/useStats";
import { StatsNumberCardContainer } from "../components/stats_number_card_container";
import { GlobalChartContainer } from "../components/global_chart_container";
import { OrdersChartContainer } from "../components/orders_chart_container";
import { StudentsChartContainer } from "../components/students_chart_container";
import { SubscriptionsChartContainer } from "../components/subscriptions_chart_container";
import { useMetrics } from "../hooks";

export const DashboardPage = () => {
  const dashboard = useDashboard();
  const { metrics, isLoading: metricsLoading } = useMetrics();

  const { registerExport } = useExportContext();

  const handleExport = useCallback(() => {
    if (!dashboard.data) return;

    const sheets: ExportSheet[] = [];

    // Sheet 1: Summary stats
    sheets.push({
      name: "Résumé",
      headers: ["Indicateur", "Valeur", "Croissance", "Tendance"],
      rows: (metrics ?? []).map((metric) => [
        metric.id,
        metric.value,
        metric.growth,
        metric.trend === "up" ? "Hausse" : "Baisse",
      ]),
    });

    // Sheet 2: Chart data (one sheet per chart, excluding the global overview which aggregates others)
    const chartConfigs: Record<string, string> = {
      students: "Étudiants",
      orders: "Commandes",
      subscriptions: "Abonnements",
      global: "Aperçu Global",
    };

    for (const chart of dashboard.data.charts) {
      const chartName = chartConfigs[chart.id] ?? chart.id;
      sheets.push({
        name: chartName,
        headers: ["Série", ...chart.labels],
        rows: chart.datasets.map((dataset, i) => {
          const seriesLabel = chart.legendItems?.[i]?.label ?? `Série ${i + 1}`;
          return [seriesLabel, ...dataset];
        }),
      });
    }

    exportToExcel("dashboard-statistiques", sheets);
  }, [dashboard.data]);

  useEffect(() => {
    return registerExport(handleExport);
  }, [registerExport, handleExport]);

  return (
    <div className="p-3 lg:p-4 xl:p-6 space-y-3 lg:space-y-4 bg-[#FAFAFF] min-h-full">
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
