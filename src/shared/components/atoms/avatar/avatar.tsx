import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  showStatusDot?: boolean;
  statusColor?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-xs sm:text-sm",
  md: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sm sm:text-base md:text-lg",
  lg: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] 2xl:w-20 2xl:h-20 text-xl sm:text-2xl md:text-3xl font-bold",
};

const dotSizeStyles: Record<AvatarSize, string> = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3 sm:w-3.5 sm:h-3.5",
};

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = "lg",
  showStatusDot = false,
  statusColor = "bg-primary-500",
  className,
}) => {
  return (
    <div className={cn("relative inline-flex", className)}>
      <div
        className={cn(
          "bg-primary-100 rounded-full flex items-center justify-center text-primary-700",
          sizeStyles[size],
        )}
      >
        {initials}
      </div>
      {showStatusDot && (
        <span
          className={cn(
            "absolute top-0 right-0 rounded-full border-2 border-white",
            dotSizeStyles[size],
            statusColor,
          )}
        />
      )}
    </div>
  );
};
