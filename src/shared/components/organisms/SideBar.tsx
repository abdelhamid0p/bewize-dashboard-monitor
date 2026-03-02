import { cn } from "@/shared/lib/utils";
import Logo from "@/assets/images/login_logo.svg";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "w-64 min-h-screen bg-white flex flex-col ",
        className
      )}
    >
      {/* Header avec logo */}
      <div className="p-6 flex items-center justify-center ">
        <img src={Logo} alt="Bewize Logo" className="h-7" />
      </div>

      {/* Navigation centrée verticalement */}
      <nav className="flex-1 flex flex-col p-4 justify-center space-y-2 mb-[10vh] ">
        {children}
      </nav>
    </aside>
  );
};
