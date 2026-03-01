import * as React from "react";
import { Button as ShadButton } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/shared/components/atoms/icon";

export type ButtonVariant = "default" | "secondary";

interface ButtonProps extends React.ComponentProps<typeof ShadButton> {
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: "left" | "right";
}

export const Button = ({
  variant = "default",
  icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <ShadButton
      {...props}
      className={cn(
        /* ===== Figma base styles ===== */
        "inline-flex items-center justify-center",
        "w-[206px] h-[44px]",
        "px-[15px] py-[11px]",
        "gap-[11px]",
        "rounded-[24px]",

        /* ===== Typography (Figma) ===== */
        "font-sans font-light text-md",
        " text-center",

        /* ===== Variants ===== */
        variant === "default" &&
          "bg-primary-500 text-neutral-100 hover:bg-primary-600",

        variant === "secondary" &&
          "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-100",

        /* ===== Transitions ===== */
        "transition-colors",

        className,
      )}
    >
      {icon && iconPosition === "left" && <Icon name={icon} size={16} />}

      {children}

      {icon && iconPosition === "right" && <Icon name={icon} size={16} />}
    </ShadButton>
  );
};
