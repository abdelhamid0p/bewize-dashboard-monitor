import { Sidebar } from "@/shared/components/organisms/SideBar";
import { NavItem } from "@/shared/components/molecules/nav-item/nav_item";
import { NAVIGATION_ITEMS } from "@/features/navigation/constantes/navigation_items";
import { useNavigation } from "../hooks/useNavigation";

export const NavigationSidebar = () => {
  const { handleNavigate, isActive } = useNavigation();

  return (
    <Sidebar>
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem
          key={item.id}
          iconName={item.icon}
          label={item.label}
          isActive={isActive(item.path)}
          onClick={() => handleNavigate(item.path)}
        />
      ))}
    </Sidebar>
  );
};
