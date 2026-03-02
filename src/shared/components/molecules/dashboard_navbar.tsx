import { Button } from "@/shared/components/atoms/button";
import { Icon, ICONS } from "@/shared/components/atoms/icon";
import { useLocation } from "react-router-dom";

interface DashboardNavbarProps {
  userName?: string;
}

// Configuration des titres selon le path
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Bon retour",
  "/dashboard/schools": "Les écoles",
  "/dashboard/students": "Les étudiants",
  "/dashboard/commandes": "Les commandes",
  "/dashboard/subscriptions": "Les abonnements",
  "/dashboard/reductions": "Les codes promo",
  "/dashboard/reservations": "Les réservations",
};

export const DashboardNavbar = ({}: DashboardNavbarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Déterminer si on est sur la page d'accueil
  const isHomePage =
    pathname === "/" || pathname === "/home" || pathname === "/dashboard";

  // Récupérer le titre de la page actuelle
  const pageTitle = PAGE_TITLES[pathname] || "Dashboard";

  return (
    <div className="flex items-center justify-between w-full py-2 md:py-3 lg:py-4 bg-gray-50">
      {/* Left - Title */}
      <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-900">
        {isHomePage ? "Bon retour" : pageTitle}
      </h1>

      {/* Right - Actions */}
      <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
        {/* Date Picker - Only on home page */}
        {isHomePage && (
          <div className="hidden md:inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs lg:text-sm text-gray-500 bg-white rounded-full">
            <Icon
              name={ICONS.calendarPlus}
              className="w-3 h-3 md:w-4 md:h-4 text-gray-500"
            />
            <span>Du Jan 01, 2025 - Feb 01, 2025</span>
          </div>
        )}

        {/* Export Button */}
        <Button
          variant="default"
          className="w-auto px-3 md:px-4 lg:px-6 h-7 md:h-8 lg:h-9 text-[10px] md:text-xs lg:text-sm"
          icon={ICONS.upload}
          iconPosition="left"
        >
          Exporter
        </Button>

        {/* Menu Button */}
        <Button
          variant="secondary"
          size="icon"
          className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 border-gray-200 rounded-full"
        >
          <Icon name={ICONS.settings} className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </div>
  );
};
