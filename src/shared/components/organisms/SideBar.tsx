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
        "w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60 2xl:w-64",
        "min-h-screen",
        "bg-neutral-100",
        "flex flex-col border-r border-neutral-200",
        className,
      )}
    >
      {/* Header avec logo */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 2xl:p-10 flex items-center justify-center">
        <img
          src={Logo}
          alt="Bewize Logo"
          className="h-5 sm:h-6 md:h-7 2xl:h-10"
        />
      </div>

      {/* Navigation centrée verticalement */}
      <nav className="flex-1 flex flex-col p-2 sm:p-3 md:p-4 justify-center space-y-1 sm:space-y-1.5 md:space-y-2 mb-[10vh]">
        {children}
      </nav>
    </aside>
  );
};
