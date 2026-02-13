import { Text } from "@/shared/components/atoms/text/text";
import { cn } from "@/shared/lib/utils";

interface NavLabelProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const NavLabel = ({
  children,
  isActive,
  className,
}: NavLabelProps) => {
  return (
    <Text
      as="span"
      variant="subtitle"
      className={cn(
        "font-medium transition-colors duration-200",
        isActive ? "text-neutral-100" : "text-neutral-1000",
        className
      )}
    >
      {children}
    </Text>
  );
};
