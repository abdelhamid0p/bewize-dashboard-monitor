import * as React from "react";
import { Button } from "@/components/ui/button";

interface ActionIconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  disabled?: boolean;
}

export function ActionIconButton({
  icon,
  ariaLabel,
  onClick,
  variant = "ghost",
  size = "icon",
  className,
  disabled,
}: ActionIconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}
