import { cn } from "@/shared/lib/utils";

interface NavLabelProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const NavLabel = ({ children, isActive, className }: NavLabelProps) => {
  return (
    <span
      className={cn(
        "font-medium transition-colors duration-200",
        "text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base",
        isActive ? "text-neutral-100" : "text-neutral-1000",
        className,
      )}
    >
      {children}
    </span>
  );
};
