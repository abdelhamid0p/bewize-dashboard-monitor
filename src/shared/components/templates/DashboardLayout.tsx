import { NavigationSidebar } from "@/features/navigation/components/NavigationSideBar"
import { Outlet, useLocation } from "react-router-dom"

const pageTitles: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/students": "Étudiants",
  "/dashboard/orders": "Commandes",
  "/dashboard/subscriptions": "Abonnements",
  "/dashboard/schools": "Écoles",
}

export const DashboardLayout = () => {
  const location = useLocation()

  const title =
    pageTitles[location.pathname] ?? "Tableau de bord"

  return (
    <div className="flex h-screen gap-y-3 bg-gray-50 overflow-hidden">

      {/* Sidebar (reste dans le flow) */}
      <NavigationSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Top bar */}
        <header className="shrink-0 h-16 bg-white px-6 flex items-center justify-between">
          
          {/* Left */}
          <div className="leading-tight">
            <p className="text-sm text-gray-500">
              Bon retour,
            </p>
            <h1 className="text-lg font-semibold text-gray-800">
              {title}
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 border px-3 py-1.5 rounded-md">
              Jun 01, 2025 - Feb 01, 2025
            </button>

            <button className="bg-purple-600 text-white text-sm px-4 py-1.5 rounded-md">
              Exporter
            </button>
          </div>

        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout
