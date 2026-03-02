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
        "flex items-center justify-start gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 transition-colors",
        "h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 2xl:h-14 w-full px-2 sm:px-3 md:px-4 lg:px-5 rounded-full",
        isActive
          ? "bg-purple-600 text-white"
          : "text-gray-700 hover:bg-purple-50 hover:text-purple-700",
      )}
    >
      <NavIcon
        name={iconName}
        variant="nav"
        className={cn(
          "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5",
          isActive ? "text-neutral-100" : "text-neutral-1000",
        )}
      />
      <NavLabel isActive={isActive}>{label}</NavLabel>
    </button>
  );
};
