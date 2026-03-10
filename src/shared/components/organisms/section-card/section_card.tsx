import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionCard - Organism that wraps content in a bordered card with a section title.
 * Used for detail page sections (orders, subscriptions, info grids).
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      <div className="border border-primary-200 rounded-2xl overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};
