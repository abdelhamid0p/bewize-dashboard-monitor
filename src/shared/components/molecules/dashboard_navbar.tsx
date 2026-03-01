import { Button } from "@/shared/components/atoms/button";
import { Icon, ICONS } from "@/shared/components/atoms/icon";
import { useLocation } from "react-router-dom";

interface DashboardNavbarProps {
  userName?: string;
}

// Configuration des titres selon le path
const PAGE_TITLES: Record<string, string> = {
  "/": "Bon retour",
  "/home": "Bon retour",
  "/dashboard": "Bon retour",
  "/schools": "Les écoles",
  "/etudiants": "Les étudiants",
  "/students": "Les étudiants",
  "/commandes": "Les commandes",
  "/abonnements": "Les abonnements",
  "/subscriptions": "Les abonnements",
  "/codes-promo": "Les codes promo",
  "/promo-codes": "Les codes promo",
  "/reservations": "Les réservations",
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
    <div className="flex items-center justify-between w-full  py-4 bg-gray-50 ">
      {/* Left - Title */}
      <h1 className="text-xl font-medium text-gray-900">
        {isHomePage ? "Bon retour" : pageTitle}
      </h1>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Date Picker - Only on home page */}
        {isHomePage && (
          <div className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-white rounded-full   ">
            <Icon name={ICONS.calendarPlus} className="w-4 h-4 text-gray-500" />
            <span>Du Jan 01, 2025 - Feb 01, 2025</span>
          </div>
        )}

        {/* Export Button */}
        <Button
          variant="default"
          className="w-auto px-6 h-9"
          icon={ICONS.upload}
          iconPosition="left"
        >
          Exporter
        </Button>

        {/* Menu Button */}
        <Button
          variant="secondary"
          size="icon"
          className="w-9 h-9 border-gray-200 rounded-full"
        >
          <Icon name={ICONS.settings} className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
