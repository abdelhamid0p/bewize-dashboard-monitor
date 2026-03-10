import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "../badge/badge";

interface InfoFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

/**
 * InfoField - Atom for displaying a labeled read-only value.
 * Used in detail pages to show student/entity information.
 * Renders a small label above a bordered rounded box with the value.
 */
export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <div className={cn("flex flex-col", "gap-0.5 sm:gap-1", className)}>
      <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-black-100 font-medium pl-1">
        {label}
      </span>
      <Badge>{value || "—"}</Badge>
    </div>
  );
};
