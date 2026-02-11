import { cn } from "@/shared/lib/utils";
import { Icon as NavIcon, type IconName } from "@/shared/components/atoms/icon";
import { NavLabel } from "../../atoms/navlabel/nav_label";

interface NavItemProps {
  iconName: IconName;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem = ({ iconName, label, isActive = false, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-3 transition-colors",
        "w-full h-[48px] px-5 rounded-[24px]", // taille fixe + border-radius
        isActive
          ? "bg-purple-600 text-white" // état actif
          : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
      )}
    >
      <NavIcon
        name={iconName}
        className={cn(
          "h-5 w-5", // taille icône
          isActive ? "text-neutral-100" : "text-neutral-1000 group-hover:text-purple-600"
        )}
      />
      <NavLabel isActive={isActive}>{label}</NavLabel> {/* texte aligné au milieu verticalement */}
    </button>
  );
};
