import { StatsNumberCard } from "@/shared/components/organisms/cards/stats_number_card"

import { statsNumbers } from "@/features/stats/data/stats_data"
import { DashboardNavbar } from "@/shared/components/molecules/nav-bar/dashboard_navbar"

export const DashboardPage = () => {
  return (
    
    <div className="p-2 ">

       {/* Dashboard Navbar */}
            <DashboardNavbar userName="Mohamed" />

      {/* Number Cards */}
      <div className="grid grid-cols-3 gap-6  ">
        {statsNumbers.map((stat) => (
          <StatsNumberCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            trend={stat.trend as "up" | "down"}
          />
        ))}
      </div>

      {/* Charts */}
     

    </div>
  )
}
