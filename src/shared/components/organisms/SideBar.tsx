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
            "w-64 2xl:w-[30vh]",
            "min-h-screen",
            "bg-neutral-100",
            "flex flex-col border-r border-neutral-200",
            className
          )}
        >

      {/* Header avec logo */}
      <div className="p-6 2xl:p-10 flex items-center justify-center  ">
        <img src={Logo} alt="Bewize Logo" className="h-7 2xl:h-10" />
      </div>

      {/* Navigation centrée verticalement */}
      <nav className="flex-1 flex flex-col p-4 justify-center space-y-2 mb-[10vh] ">
        {children}
      </nav>
    </aside>
  );
};
