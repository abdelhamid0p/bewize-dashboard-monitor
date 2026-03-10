import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  InfoFieldGrid,
  type InfoFieldItem,
} from "@/shared/components/molecules/info-field-grid";

interface InfoSectionProps {
  title: string;
  fields: InfoFieldItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * InfoSection - Reusable organism that displays a titled section of info fields.
 * Combines a section title with an InfoFieldGrid molecule.
 * Used in student details and any entity detail page.
 */
export const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  fields,
  columns = 2,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#F6F6F6] rounded-2xl flex flex-col",
        "p-4 sm:p-5 md:p-6 lg:p-8",
        "gap-3 sm:gap-3.5 md:gap-4",
        "space-y-3 sm:space-y-4",
        className,
      )}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      <InfoFieldGrid fields={fields} columns={columns} />
    </div>
  );
};
