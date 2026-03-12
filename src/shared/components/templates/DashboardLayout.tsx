import { NavigationSidebar } from "@/features/navigation/components/navigation_sidebar";
import { getNavbarConfig } from "@/features/navigation/constantes/navigation_items";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardNavbar } from "../molecules/nav-bar/dashboard_navbar";
import { Icon, ICONS } from "../atoms/icon";

export const DashboardLayout = () => {
  const location = useLocation();
  const navbarConfig = getNavbarConfig(location.pathname);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (reste dans le flow) */}
      <NavigationSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="shrink-0 bg-white">
          {/* Top bar with chevron */}
          <div className="flex items-center justify-end px-6 py-2">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Icon
                name={ICONS.chevronDown}
                className="w-4 h-[2vh] text-gray-400"
              />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-2">
          <DashboardNavbar config={navbarConfig} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
