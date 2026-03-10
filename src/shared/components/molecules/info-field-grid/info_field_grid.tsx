import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { InfoField } from "@/shared/components/atoms/info-field";

export interface InfoFieldItem {
  label: string;
  value: React.ReactNode;
}

interface InfoFieldGridProps {
  fields: InfoFieldItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * InfoFieldGrid - Molecule that renders a grid of InfoField atoms.
 * Used in detail pages to display entity information in a structured grid layout.
 */
export const InfoFieldGrid: React.FC<InfoFieldGridProps> = ({
  fields,
  columns = 2,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid",
        "gap-2.5 sm:gap-3 md:gap-4 lg:gap-5",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {fields.map((field) => (
        <InfoField key={field.label} label={field.label} value={field.value} />
      ))}
    </div>
  );
};
