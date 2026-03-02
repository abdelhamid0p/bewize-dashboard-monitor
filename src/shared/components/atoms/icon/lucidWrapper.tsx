import * as LucideIcons from "lucide-react";
import React from "react";
import { cn } from "@/shared/lib/utils";
import type { IconName } from "./iconName";

export type IconVariant = "default" | "nav" | "button" | "sm" | "lg";

interface IconProps {
  name: IconName;
  variant?: IconVariant;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  variant = "default",
  className,
}) => {
  const IconComponent = LucideIcons[name] as React.ElementType;

  return (
    <IconComponent
      className={cn(
        "shrink-0 transition-colors",

        {
          // Default icon
          "w-5 h-5": variant === "default",

          // Sidebar nav icon (responsive)
          "w-4! h-4! md:w-5! md:h-5! 2xl:w-8! 2xl:h-8!": variant === "nav",

          // Button icon
          "w-4! h-4! md:w-4.5! md:h-4.5!": variant === "button",

          // Small
          "w-3 h-3": variant === "sm",

          // Large
          "w-6 h-6 md:w-7 md:h-7": variant === "lg",
        },

        className,
      )}
    />
  );
};
