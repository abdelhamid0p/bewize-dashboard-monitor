import { cn } from "@/shared/lib/utils";

interface StudentGenderCellProps {
  genderLabel: string;
  genderColor?: "red" | "blue";
}

export const StudentGenderCell = ({
  genderLabel,
  genderColor,
}: StudentGenderCellProps) => {
  return (
    <span className="flex items-center gap-1.5 text-sm text-neutral-700">
      <span
        className={cn(
          "w-2 h-2 rounded-full inline-block",
          genderColor === "red"
            ? "bg-red-500"
            : genderColor === "blue"
              ? "bg-blue-500"
              : undefined,
        )}
      />
      {genderLabel}
    </span>
  );
};
