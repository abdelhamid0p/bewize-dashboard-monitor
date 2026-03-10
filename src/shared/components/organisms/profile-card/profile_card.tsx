import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface ProfileCardProps {
  icon: React.ReactNode;
  name: string;
  badges?: React.ReactNode;
  className?: string;
}

/**
 * ProfileCard - Reusable organism that displays a profile summary.
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({
  icon,
  name,
  badges,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#F6F6F6] rounded-2xl flex flex-col",
        "p-4 sm:p-5 md:p-6 lg:p-8",
        "gap-3 sm:gap-3.5 md:gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="shrink-0">{icon}</div>

        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-neutral-900 truncate">
          {name}
        </span>
      </div>

      {badges && <div className="flex flex-wrap gap-2 w-full">{badges}</div>}
    </div>
  );
};
