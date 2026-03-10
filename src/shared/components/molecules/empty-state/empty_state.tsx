import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * EmptyState - Molecule for empty data sections.
 * Displays a centered message when no data is available (tables, lists).
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "py-6 sm:py-8 md:py-10 lg:py-12",
        className,
      )}
    >
      <p className="font-semibold text-neutral-700 text-xs sm:text-sm md:text-base">
        {title}
      </p>
      {description && (
        <p className="text-neutral-400 mt-1 text-[10px] sm:text-xs md:text-sm">
          {description}
        </p>
      )}
    </div>
  );
};
