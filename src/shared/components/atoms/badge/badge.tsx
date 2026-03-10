import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "outline" | "filled";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "outline",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center text-center rounded-2xl font-medium",
        "px-3 py-2 text-xs md:text-sm",
        variant === "outline" &&
          "border border-neutral-200 text-black-100 bg-white",
        variant === "filled" && "bg-primary-100 text-primary-700",
        className,
      )}
    >
      {children}
    </div>
  );
};
