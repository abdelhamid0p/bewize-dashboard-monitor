import { cn } from "@/shared/lib/utils";
import { Icon as NavIcon, type IconName } from "@/shared/components/atoms/icon";
import { NavLabel } from "../../atoms/navlabel/nav_label";
import { Button } from "../../atoms/button";

interface NavItemProps {
  iconName: IconName;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  iconName,
  label,
  isActive = false,
  onClick,
}: NavItemProps) => {
  return (
 <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-3 transition-colors",
        " h-[8vh] max-w-[30vh] px-5 rounded-full", 
        isActive
          ? "bg-purple-600 text-white" 
          : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
      )}
    >
  <NavIcon
  name={iconName}
  variant="nav"
  className={isActive ? "text-neutral-100" : "text-neutral-1000"}
  />
      <NavLabel isActive={isActive}>{label}</NavLabel> {/* texte aligné au milieu verticalement */}
    </button>
  );
};
